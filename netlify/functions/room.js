const { getStore, connectLambda } = require('@netlify/blobs');

// ---- theme/category-draft data (kept small + self-contained for the function) ----
const gamedata = require('./gamedata.js');
const THEMES = gamedata.THEMES;
const CATEGORY_THEMES = gamedata.CATEGORY_THEMES; // { football, sandwich, movie, ... }
const ITEM_BY_ID = gamedata.ITEM_BY_ID;

function store(){
  // NOTE: 'strong' consistency requires an internal uncachedEdgeURL that Netlify
  // doesn't populate for classic (Lambda-compatibility) functions even with
  // connectLambda() called — using default eventual consistency instead. Every
  // write below is still ETag-guarded (onlyIfMatch), so this can't corrupt state;
  // worst case is an occasional "someone else acted first" retry.
  return getStore({ name: 'rooms' });
}

function json(statusCode, body){
  return { statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
}

function roomCodeGen(){
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i=0;i<5;i++) s += chars[Math.floor(Math.random()*chars.length)];
  return s;
}
function shuffle(arr){
  const a = arr.slice();
  for (let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function resolveThemeItems(theme){
  if (CATEGORY_THEMES[theme.themeKey]) {
    const ct = CATEGORY_THEMES[theme.themeKey];
    return { categoryTheme: theme.themeKey, name: ct.name, emoji: ct.emoji };
  }
  if (theme.themeKey === 'custom' && theme.customTheme) {
    return { categoryTheme: null, name: theme.customTheme.name, emoji:'✏️', items: theme.customTheme.items };
  }
  const t = THEMES[theme.themeKey];
  if (!t) throw new Error('Unknown theme');
  return { categoryTheme: null, name:t.name, emoji:t.emoji, items:t.items };
}

function buildCategoryQueue(catThemeKey, cat, exclude){
  const ct = CATEGORY_THEMES[catThemeKey];
  const skip = exclude || new Set();
  const keep = arr => arr.filter(it => !skip.has(it[0]));
  const poolShuffled = shuffle(keep(ct.pool[cat]));
  if (!ct.icons) return poolShuffled;
  const iconsAll = shuffle(keep(ct.icons[cat]));
  const icons3 = iconsAll.slice(0,3);
  const restIcons = icons3.slice(1);
  const rest = shuffle(restIcons.concat(poolShuffled));
  return icons3.length ? [icons3[0]].concat(rest) : rest;
}
// Names already on someone's team — a refilled queue must never re-offer them.
function draftedNames(room){
  const out = new Set();
  sidesOf(room).forEach(p => (p.items||[]).forEach(it => out.add(it.name)));
  return out;
}

function newGame(themeResolved){
  const g = {
    catThemeKey: themeResolved.categoryTheme || null,
    turnIdx: 0,
    openerIdx: 0,
    mode: 'idle',
    currentLot: null,
    currentBid: 0,
    currentBidderIdx: null,
    soloPlayerIdx: null,
    skipsUsed: 0,
    passStreak: 0,
    tickerLog: [],
    bidLog: [],
    catIdx: 0,
    catQueue: null,
    itemPool: null
  };
  if (g.catThemeKey) {
    const ct = CATEGORY_THEMES[g.catThemeKey];
    g.catQueue = buildCategoryQueue(g.catThemeKey, ct.cats[0]);
  } else {
    g.itemPool = shuffle(themeResolved.items.map(it => ({ name: it[0], r: it[1] })));
  }
  return g;
}

function playerNeedsFlat(p){ return p.items.length < 5; }
function playerNeedsCat(p, cat, requiredMap){ return p.items.filter(it => it.cat === cat).length < requiredMap[cat]; }

function roomHost(room){ return room.players.find(p => p.role === 'host'); }
// The "contestants" in the auction — one entry per player normally, or one
// entry per TEAM in a 2v2 room (so budget/items are shared, not per-person).
function sidesOf(room){
  return room.hostMode === '2v2' ? room.teams : room.players.filter(p => p.role !== 'host');
}
function sideLabel(room, sideIdx){
  if (room.hostMode === '2v2') return sideIdx === 0 ? 'Team A' : 'Team B';
  const s = sidesOf(room)[sideIdx];
  return s ? s.nickname : '?';
}

// In a 2v2 room, both teammates must submit the SAME proposal before it takes
// effect. Returns true if the action should execute now (consensus reached,
// or this isn't a team room at all); false if it was only recorded and is
// waiting on the teammate — the caller should stop without executing.
function checkTeamConsensus(room, sideIdx, nickname, type, amount){
  if (room.hostMode !== '2v2') return true;
  const g = room.game;
  const amt = amount === undefined ? null : amount;
  const pa = g.pendingAction;
  const matches = pa && pa.team === sideIdx && pa.type === type && pa.amount === amt;
  if (matches) {
    if (!pa.agreedBy.includes(nickname)) pa.agreedBy.push(nickname);
    if (pa.agreedBy.length >= 2) { g.pendingAction = null; return true; }
    return false;
  }
  g.pendingAction = { team: sideIdx, type, amount: amt, agreedBy: [nickname], expiresAt: Date.now() + 20000 };
  return false;
}

// If a team's teammate never responded, don't stall the game — treat the
// silence as tacit agreement once the 20s window is up. Called at the top of
// every request that touches this room, so it fires on the next poll/action
// regardless of who happens to make it.
function tickPendingTeamAction(room){
  const g = room.game;
  if (!g || !g.pendingAction) return false;
  if (Date.now() < g.pendingAction.expiresAt) return false;
  const pa = g.pendingAction;
  g.pendingAction = null;
  applyResolvedAction(room, pa.team, pa.type, pa.amount);
  return true;
}

// The actual state mutation for a resolved (consensus-reached, or
// non-team-room) raise/pass/skip/claim. Shared by the normal path and the
// timeout path so they can never drift out of sync with each other.
function applyResolvedAction(room, sideIdx, type, amount){
  const g = room.game;
  const bidders = sidesOf(room);
  if (type === 'raise') {
    g.currentBid = amount; g.currentBidderIdx = sideIdx; g.passStreak = 0;
    g.tickerLog.push(`${sideLabel(room, sideIdx)}: $${amount}`);
    g.turnIdx = 1 - sideIdx;
  } else if (type === 'pass') {
    if (g.currentBidderIdx === null) {
      g.passStreak = (g.passStreak||0) + 1;
      if (g.passStreak >= 2) {
        const allBroke = bidders.every(p => p.budget < 1);
        if (allBroke) resolveLotWinner(room, sideIdx, 0);
        else unsoldLot(room);
      } else { g.turnIdx = 1 - sideIdx; }
    } else {
      resolveLotWinner(room, g.currentBidderIdx, g.currentBid);
    }
  } else if (type === 'claim') {
    resolveLotWinner(room, sideIdx, amount);
  } else if (type === 'skip') {
    g.skipsUsed++;
    if (g.skipsUsed >= 4) {
      resolveLotWinner(room, sideIdx, bidders[sideIdx].budget === 0 ? 0 : 1);
    } else {
      const cat = g.currentLot.cat;
      const passedOver = g.currentLot;
      if (g.catThemeKey) {
        const cand = g.catQueue.shift();
        if (cand) { g.catQueue.push([passedOver.name, passedOver.r]); g.currentLot = { name: cand[0], r: cand[1], cat }; }
      } else {
        const cand = g.itemPool.shift();
        if (cand) { g.itemPool.push({ name: passedOver.name, r: passedOver.r }); g.currentLot = { name: cand.name, r: cand.r, cat: null }; }
      }
    }
  }
}

function mySideIndex(room, nickname){
  if (room.hostMode === '2v2') {
    const p = room.players.find(p => p.nickname === nickname);
    return p ? p.team : -1;
  }
  return sidesOf(room).findIndex(p => p.nickname === nickname);
}

function drawNextLot(room){
  const g = room.game;
  const bidders = sidesOf(room);
  if (g.catThemeKey) {
    const ct = CATEGORY_THEMES[g.catThemeKey];
    let cat = ct.cats[g.catIdx];
    while (g.catIdx < ct.cats.length && !bidders.some(p => playerNeedsCat(p, cat, ct.required))) {
      g.catIdx++;
      if (g.catIdx >= ct.cats.length) { room.phase = 'results'; g.currentLot=null; return; }
      cat = ct.cats[g.catIdx];
      g.catQueue = buildCategoryQueue(g.catThemeKey, cat, draftedNames(room));
      g.skipsUsed = 0;
    }
    const wanting = bidders.map((p,i)=>i).filter(i => playerNeedsCat(bidders[i], cat, ct.required));
    if (!wanting.length) { room.phase='results'; g.currentLot=null; return; }
    // In a hosted room the host is the auctioneer: pause and let them choose
    // the next lot instead of drawing one automatically.
    if (roomHost(room)) {
      g.awaitingHostPick = true; g.pickCat = cat; g.currentLot = null; g.mode = 'idle';
      return;
    }
    // console-queued items for this category come up first
    g.pendingNext = g.pendingNext || {};
    let cand = (g.pendingNext[cat] && g.pendingNext[cat].length) ? g.pendingNext[cat].shift() : g.catQueue.shift();
    if (!cand) { g.catQueue = buildCategoryQueue(g.catThemeKey, cat, draftedNames(room)); cand = g.catQueue.shift(); }
    if (!cand) { room.phase='results'; g.currentLot=null; return; } // category genuinely exhausted
    g.currentLot = { name: cand[0], r: cand[1], cat };
    startLotMode(g, wanting);
  } else {
    if (bidders.every(p => p.items.length >= 5)) { room.phase='results'; g.currentLot=null; return; }
    const wanting = bidders.map((p,i)=>i).filter(i => playerNeedsFlat(bidders[i]));
    if (!wanting.length) { room.phase='results'; g.currentLot=null; return; }
    if (roomHost(room)) {
      g.awaitingHostPick = true; g.pickCat = null; g.currentLot = null; g.mode = 'idle';
      return;
    }
    g.pendingNext = g.pendingNext || {};
    const next = (g.pendingNext._ && g.pendingNext._.length) ? g.pendingNext._.shift() : g.itemPool.shift();
    if (!next) { room.phase='results'; g.currentLot=null; return; }
    g.currentLot = { name: next.name, r: next.r, cat: null };
    startLotMode(g, wanting);
  }
}

// Items the host may choose from right now: everything in the live category
// that nobody has drafted yet.
function hostPickOptions(room){
  const g = room.game;
  const drafted = draftedNames(room);
  if (g.catThemeKey) {
    const ct = CATEGORY_THEMES[g.catThemeKey];
    const cat = g.pickCat || ct.cats[g.catIdx];
    return (ct.pool[cat]||[]).concat(ct.icons ? (ct.icons[cat]||[]) : [])
      .filter(it => !drafted.has(it[0]))
      .map(it => ({ name: it[0], r: it[1], cat }));
  }
  return (g.itemPool||[]).filter(it => !drafted.has(it.name))
    .map(it => ({ name: it.name, r: it.r, cat: null }));
}
function startLotMode(g, wanting){
  if (wanting.length >= 2) {
    g.mode = 'contested';
    g.currentBid = 0; g.currentBidderIdx = null;
    g.turnIdx = g.openerIdx;
    g.tickerLog = [];
    g.skipsUsed = 0;
    g.passStreak = 0;
  } else {
    g.mode = 'solo';
    g.soloPlayerIdx = wanting[0];
    g.currentBid = 0; g.currentBidderIdx = null;
    g.skipsUsed = 0;
    g.tickerLog = [];
  }
}

function resolveLotWinner(room, winnerIdx, amount){
  const g = room.game;
  const bidders = sidesOf(room);
  const winner = bidders[winnerIdx];
  winner.budget -= amount;
  winner.items.push({ name: g.currentLot.name, r: g.currentLot.r, cat: g.currentLot.cat, paid: amount });
  g.bidLog.push({ player: winnerIdx, name: g.currentLot.name, amount, cat: g.currentLot.cat });
  g.openerIdx = 1 - g.openerIdx;
  g.mode = 'idle'; g.currentLot = null;
  drawNextLot(room);
}
function unsoldLot(room){
  const g = room.game;
  // Recycle rather than discard, or a run of double-passes can drain the
  // whole pool with nobody having drafted anything (worst on small pools).
  if (g.currentLot) {
    if (g.catThemeKey) { g.catQueue = g.catQueue || []; g.catQueue.push([g.currentLot.name, g.currentLot.r]); }
    else { g.itemPool = g.itemPool || []; g.itemPool.push({ name: g.currentLot.name, r: g.currentLot.r }); }
  }
  g.mode = 'idle'; g.currentLot = null;
  g.openerIdx = 1 - g.openerIdx;
  drawNextLot(room);
}

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

// Reads the room, lets mutateFn apply changes in place, then writes with an
// ETag guard. Since we're on eventual consistency (see note above), a read
// can return a version tag that's already stale by the time we write — that's
// not a real conflict, just a propagation lag, so we re-read and reapply the
// mutation a few times before giving up. mutateFn returns nothing on success,
// or {status, error} for a genuine validation failure (never retried).
async function readMutateWrite(s, code, mutateFn, opts){
  opts = opts || {};
  const maxAttempts = opts.maxAttempts || 6;
  let lastRetryableFail = null;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let got = await s.getWithMetadata(code, { type: 'json' });
    if (!got || !got.data) {
      if (attempt < maxAttempts - 1) { await sleep(250 * (attempt + 1)); continue; }
      return { status: 404, error: 'Room not found' };
    }
    const room = got.data;
    const fail = mutateFn(room);
    if (fail) {
      if (fail.noop) return { room }; // already applied (e.g. rejoin) — no write needed, just hand back current state
      if (fail.retryable && attempt < maxAttempts - 1) {
        // This read might just be a moment stale (eventual consistency) rather
        // than a genuine rejection — e.g. "not your turn" when it actually IS
        // your turn, just not on the copy this read happened to land on.
        // Re-read fresh and check again before reporting it as real.
        lastRetryableFail = fail;
        await sleep(Math.min(150 * (attempt + 1), 700));
        continue;
      }
      return fail; // logical error — don't retry, it won't resolve itself
    }
    const ok = await s.setJSON(code, room, { onlyIfMatch: got.etag });
    if (ok) return { room };
    await sleep(Math.min(200 * (attempt + 1), 900));
  }
  return lastRetryableFail || { status: 409, error: 'Room changed, please retry' };
}

exports.handler = async (event) => {
  connectLambda(event);
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch(e){ return json(400, { error: 'Bad JSON' }); }
  const { action } = body;
  const s = store();

  try {
    if (action === 'create') {
      const code = roomCodeGen();
      const themeResolved = resolveThemeItems(body.theme || {});
      const hostMode = body.hostMode === '3p' ? '3p' : body.hostMode === '2v2' ? '2v2' : '2p';
      const room = {
        code, hostMode, phase: 'lobby',
        theme: { key: (body.theme&&body.theme.themeKey)||'backyard', name: themeResolved.name, emoji: themeResolved.emoji,
                 categoryTheme: themeResolved.categoryTheme, items: themeResolved.items || null, custom: body.theme&&body.theme.customTheme || null },
        players: hostMode === '2v2'
          ? [ { nickname: body.nickname, role: 'creator', team: 0 } ]
          : [ { nickname: body.nickname, role: hostMode==='3p' ? 'host' : 'creator', budget: 20, items: [] } ],
        teams: hostMode === '2v2' ? [ { budget: 20, items: [] }, { budget: 20, items: [] } ] : undefined,
        game: null,
        rev: 1
      };
      await s.setJSON(code, room);
      return json(200, { room });
    }

    if (action === 'join') {
      const code = body.roomCode;
      if (!code) return json(400, { error: 'Missing room code' });
      const result = await readMutateWrite(s, code, (room) => {
        const needed = room.hostMode === '3p' ? 3 : room.hostMode === '2v2' ? 4 : 2;
        if (room.players.some(p => p.nickname === body.nickname)) {
          // Same nickname trying to join again almost always means: their first
          // attempt actually succeeded server-side, but the response never made
          // it back to their device (dropped connection, slow network). Treat
          // this as "welcome back" rather than an error — otherwise they're
          // stuck holding a seat they can't see.
          return { noop: true };
        }
        if (room.players.length >= needed) {
          return { status: 400, error: `Room is full (${room.players.length}/${needed}). Players already in: ${room.players.map(p=>`${p.nickname}[${p.role}]`).join(', ')}. Room phase: ${room.phase}, created for hostMode "${room.hostMode}".` };
        }
        if (room.hostMode === '2v2') {
          // fill team 0 (2 seats) before team 1
          const teamCounts = [0,0];
          room.players.forEach(p => teamCounts[p.team]++);
          const team = teamCounts[0] < 2 ? 0 : 1;
          room.players.push({ nickname: body.nickname, role: 'bidder', team });
        } else {
          room.players.push({ nickname: body.nickname, role: 'bidder', budget: 20, items: [] });
        }
        if (room.players.length === needed) {
          room.phase = 'drafting';
          if (room.hostMode === '2v2') room.teams = [ { budget: 20, items: [] }, { budget: 20, items: [] } ];
          room.game = newGame(resolveThemeItems({ themeKey: room.theme.key, customTheme: room.theme.custom }));
          drawNextLot(room);
        }
      });
      if (result.error) return json(result.status, { error: result.error });
      return json(200, { room: result.room });
    }

    if (action === 'state') {
      const code = body.roomCode;
      // Cheap plain read in the common case. Only escalate to a write if a
      // 2v2 team's proposal has actually expired, so a poller's screen
      // catches the auto-resolved outcome without anyone submitting anything.
      const peek = await s.get(code, { type: 'json' });
      if (!peek) return json(404, { error: 'Room not found' });
      const pa = peek.game && peek.game.pendingAction;
      if (pa && Date.now() >= pa.expiresAt) {
        const result = await readMutateWrite(s, code, (room) => {
          if (room.hostMode === '2v2') tickPendingTeamAction(room);
        });
        if (!result.error) {
          const opts = (result.room.game && result.room.game.awaitingHostPick) ? hostPickOptions(result.room) : null;
          return json(200, { room: result.room, options: opts });
        }
      }
      const opts = (peek.game && peek.game.awaitingHostPick) ? hostPickOptions(peek) : null;
      return json(200, { room: peek, options: opts });
    }

    if (action === 'raise' || action === 'pass' || action === 'skip' || action === 'claim') {
      const code = body.roomCode;
      const result = await readMutateWrite(s, code, (room) => {
        // A stale proposal from a non-responding teammate resolves itself
        // here, before we even look at the incoming request.
        if (room.hostMode === '2v2') tickPendingTeamAction(room);
        if (room.phase !== 'drafting' || !room.game || !room.game.currentLot) return { status: 400, error: 'No active lot', retryable: true };
        if (room.game.awaitingHostPick) return { status: 400, error: 'Waiting for the host to choose the lot', retryable: true };
        const g = room.game;
        const bidders = sidesOf(room);
        const myIdx = mySideIndex(room, body.nickname);
        if (myIdx < 0) return { status: 403, error: 'Not a bidder in this room', retryable: true };

        if (action === 'raise') {
          if (g.mode !== 'contested' || g.turnIdx !== myIdx) return { status: 400, error: 'Not your turn', retryable: true };
          const amount = parseInt(body.amount, 10);
          if (!(amount > g.currentBid) || amount > bidders[myIdx].budget) return { status: 400, error: 'Invalid raise' };
          if (!checkTeamConsensus(room, myIdx, body.nickname, 'raise', amount)) return;
          applyResolvedAction(room, myIdx, 'raise', amount);
        } else if (action === 'pass') {
          if (g.mode !== 'contested' || g.turnIdx !== myIdx) return { status: 400, error: 'Not your turn', retryable: true };
          if (!checkTeamConsensus(room, myIdx, body.nickname, 'pass', null)) return;
          applyResolvedAction(room, myIdx, 'pass', null);
        } else if (action === 'skip') {
          if (roomHost(room)) return { status: 400, error: 'The host chooses the lots in this room' };
          if (g.mode !== 'solo' || g.soloPlayerIdx !== myIdx) return { status: 400, error: 'Not your turn', retryable: true };
          if (!checkTeamConsensus(room, myIdx, body.nickname, 'skip', null)) return;
          applyResolvedAction(room, myIdx, 'skip', null);
        } else if (action === 'claim') {
          if (g.mode !== 'solo' || g.soloPlayerIdx !== myIdx) return { status: 400, error: 'Not your turn', retryable: true };
          const budget = bidders[myIdx].budget;
          let amount = budget === 0 ? 0 : Math.max(1, Math.min(budget, parseInt(body.amount,10) || 1));
          if (!checkTeamConsensus(room, myIdx, body.nickname, 'claim', amount)) return;
          applyResolvedAction(room, myIdx, 'claim', amount);
        }
      });
      if (result.error) return json(result.status, { error: result.error });
      return json(200, { room: result.room });
    }

    if (action === 'newRound') {
      const code = body.roomCode;
      const result = await readMutateWrite(s, code, (room) => {
        const requester = room.players.find(p => p.nickname === body.nickname);
        if (!requester || (requester.role !== 'host' && requester.role !== 'creator')) {
          return { status: 403, error: 'Only the host can start a rematch' };
        }
        const themeResolved = resolveThemeItems(body.theme || {});
        room.theme = { key: (body.theme&&body.theme.themeKey)||room.theme.key, name: themeResolved.name, emoji: themeResolved.emoji,
                       categoryTheme: themeResolved.categoryTheme, items: themeResolved.items || null, custom: body.theme&&body.theme.customTheme || null };
        if (room.hostMode === '2v2') room.teams = [ { budget: 20, items: [] }, { budget: 20, items: [] } ];
        else room.players.forEach(p => { p.budget = 20; p.items = []; });
        room.game = null; room.game = newGame(themeResolved);
        room.phase = 'drafting';
        drawNextLot(room);
      });
      if (result.error) return json(result.status, { error: result.error });
      return json(200, { room: result.room });
    }

    if (action === 'hostPick') {
      const code = body.roomCode;
      const result = await readMutateWrite(s, code, (room) => {
        const host = roomHost(room);
        if (!host) return { status: 400, error: 'This room has no host' };
        if (host.nickname !== body.nickname) return { status: 403, error: 'Only the host picks lots' };
        const g = room.game;
        if (!g) return { status: 400, error: 'No active game', retryable: true };
        if (!g.awaitingHostPick) return { status: 400, error: 'A lot is already up', retryable: true };

        const options = hostPickOptions(room);
        if (!options.length) { room.phase = 'results'; g.currentLot = null; g.awaitingHostPick = false; return; }

        const arg = String(body.item || '').trim();
        let chosen = null;
        if (/^\d+$/.test(arg)) {
          const rec = ITEM_BY_ID[parseInt(arg, 10)];
          if (rec) chosen = options.find(o => o.name === rec.name);
        }
        if (!chosen && arg) {
          const lower = arg.toLowerCase();
          chosen = options.find(o => o.name.toLowerCase() === lower)
                || options.find(o => o.name.toLowerCase().includes(lower));
        }
        if (!chosen) return { status: 400, error: `"${body.item}" isn't available in this category` };

        // pull it out of the normal queue so it can't come up twice
        const strip = arr => { if(!arr) return; const i = arr.findIndex(x => (x[0] || x.name) === chosen.name); if (i > -1) arr.splice(i,1); };
        strip(g.catQueue); strip(g.itemPool);

        const bidders = sidesOf(room);
        let wanting;
        if (g.catThemeKey) {
          const ct = CATEGORY_THEMES[g.catThemeKey];
          wanting = bidders.map((p,i)=>i).filter(i => playerNeedsCat(bidders[i], chosen.cat, ct.required));
        } else {
          wanting = bidders.map((p,i)=>i).filter(i => playerNeedsFlat(bidders[i]));
        }
        if (!wanting.length) { room.phase='results'; g.currentLot=null; g.awaitingHostPick=false; return; }

        g.awaitingHostPick = false;
        g.pickCat = null;
        g.currentLot = { name: chosen.name, r: chosen.r, cat: chosen.cat };
        startLotMode(g, wanting);
      });
      if (result.error) return json(result.status, { error: result.error });
      return json(200, { room: result.room, options: hostPickOptions(result.room) });
    }

    if (action === 'debug') {
      // Debug console commands (money / next) — same-device party game, not a
      // public service, so this is intentionally low-ceremony: any bidder in
      // the room can adjust their own budget or force an upcoming item/player.
      const code = body.roomCode;
      const result = await readMutateWrite(s, code, (room) => {
        if (!room.game) return { status: 400, error: 'No active game', retryable: true };
        const g = room.game;
        const bidders = sidesOf(room);
        const myIdx = mySideIndex(room, body.nickname);
        if (myIdx < 0) return { status: 403, error: 'Not a bidder in this room', retryable: true };
        const cmd = (body.cmd || '').toLowerCase();
        const arg = body.arg || '';

        if (cmd === 'money' || cmd === 'money+') {
          const parts = String(arg).trim().split(/\s+/);
          const amt = parseInt(parts[0], 10);
          if (isNaN(amt)) return { status: 400, error: 'Usage: money <amount> [nickname]' };
          const targetName = parts.slice(1).join(' ').trim();
          let target = bidders[myIdx];
          if (targetName) {
            const targetIdx = mySideIndex(room, room.players.find(p => p.nickname.toLowerCase() === targetName.toLowerCase())?.nickname);
            target = targetIdx >= 0 ? bidders[targetIdx] : null;
            if (!target) {
              const known = room.hostMode === '2v2' ? room.players.map(p=>p.nickname).join(', ') : bidders.map(p=>p.nickname).join(', ');
              return { status: 400, error: `No bidder named "${targetName}". In this room: ${known}` };
            }
          }
          target.budget = cmd === 'money' ? amt : target.budget + amt;
          if (target.budget < 0) target.budget = 0;
        } else if (cmd === 'next') {
          if (!arg) return { status: 400, error: 'Usage: next <id or item name>' };
          const drafted = draftedNames(room);
          const themeKey = g.catThemeKey || room.theme.key;

          // resolve by numeric id first, then by (partial) name
          let resolved = null;
          if (/^\d+$/.test(arg.trim())) {
            const rec = ITEM_BY_ID[parseInt(arg.trim(), 10)];
            if (!rec) return { status: 400, error: `No item with id ${arg.trim()}` };
            if (rec.themeKey !== themeKey) return { status: 400, error: `#${rec.id} "${rec.name}" belongs to a different theme` };
            resolved = rec;
          } else {
            const lower = arg.toLowerCase();
            const all = Object.keys(ITEM_BY_ID).map(k => ITEM_BY_ID[k])
              .filter(r => r.themeKey === themeKey && r.name.toLowerCase().includes(lower));
            if (!all.length) return { status: 400, error: `No match for "${arg}" in this theme` };
            resolved = all[0];
          }
          if (drafted.has(resolved.name)) return { status: 400, error: `"${resolved.name}" is already drafted` };
          if (g.currentLot && g.currentLot.name === resolved.name) {
            return { status: 400, error: `"${resolved.name}" is already the current lot` };
          }

          // Queue it — the lot being bid on right now is left alone.
          g.pendingNext = g.pendingNext || {};
          const key = resolved.cat || '_';
          g.pendingNext[key] = g.pendingNext[key] || [];
          const dupe = g.pendingNext[key].some(it => (it[0] || it.name) === resolved.name);
          if (!dupe) {
            g.pendingNext[key].push(g.catThemeKey ? [resolved.name, resolved.r] : { name: resolved.name, r: resolved.r });
            // remove it from the normal queue so it can't also appear later
            const strip = arr => { if(!arr) return; const i = arr.findIndex(x => (x[0] || x.name) === resolved.name); if (i > -1) arr.splice(i,1); };
            strip(g.catQueue); strip(g.itemPool);
          }
          g.queuedNotice = `#${resolved.id} ${resolved.name}${resolved.cat ? ' ('+resolved.cat+')' : ''} queued up next`;
        } else {
          return { status: 400, error: `Unknown command: ${cmd}` };
        }
      });
      if (result.error) return json(result.status, { error: result.error });
      const notice = result.room && result.room.game ? result.room.game.queuedNotice : null;
      if (result.room && result.room.game) delete result.room.game.queuedNotice;
      return json(200, { room: result.room, notice });
    }

    return json(400, { error: 'Unknown action' });
  } catch (err) {
    return json(500, { error: err.message || 'Server error' });
  }
};
