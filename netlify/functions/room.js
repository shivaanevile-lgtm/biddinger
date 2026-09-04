const { getStore } = require('@netlify/blobs');

const FOOTBALL_CATS = ['GK','DEF','MID','ATT'];
const FOOTBALL_REQUIRED = { GK:1, DEF:1, MID:2, ATT:1 };

// ---- theme/football data (kept small + self-contained for the function) ----
const THEMES = require('./gamedata.js').THEMES;
const FOOTBALL = require('./gamedata.js').FOOTBALL;

function store(){
  return getStore({ name: 'rooms', consistency: 'strong' });
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
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function resolveThemeItems(theme){
  if (theme.themeKey === 'football') return { football:true, name:'5-a-Side Draft', emoji:'⚽' };
  if (theme.themeKey === 'custom' && theme.customTheme) {
    return { football:false, name: theme.customTheme.name, emoji:'✏️', items: theme.customTheme.items };
  }
  const t = THEMES[theme.themeKey];
  if (!t) throw new Error('Unknown theme');
  return { football:false, name:t.name, emoji:t.emoji, items:t.items };
}

function buildFootballQueue(cat){
  const iconsAll = shuffle(FOOTBALL.icons[cat].slice());
  const icons3 = iconsAll.slice(0,3);
  const lead = icons3[0];
  const restIcons = icons3.slice(1);
  const poolShuffled = shuffle(FOOTBALL.pool[cat].slice());
  const rest = shuffle(restIcons.concat(poolShuffled));
  return [lead].concat(rest);
}

function newGame(themeResolved){
  const g = {
    isFootball: !!themeResolved.football,
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
    footballCatIdx: 0,
    footballQueue: null,
    itemPool: null
  };
  if (g.isFootball) {
    g.footballQueue = buildFootballQueue(FOOTBALL_CATS[0]);
  } else {
    g.itemPool = shuffle(themeResolved.items.map(it => ({ name: it[0], r: it[1] })));
  }
  return g;
}

function playerNeedsFlat(p){ return p.items.length < 5; }
function playerNeedsCat(p, cat){ return p.items.filter(it => it.cat === cat).length < FOOTBALL_REQUIRED[cat]; }

function drawNextLot(room){
  const g = room.game;
  const bidders = room.players.filter(p => p.role !== 'host');
  if (g.isFootball) {
    let cat = FOOTBALL_CATS[g.footballCatIdx];
    while (g.footballCatIdx < FOOTBALL_CATS.length && !bidders.some(p => playerNeedsCat(p, cat))) {
      g.footballCatIdx++;
      if (g.footballCatIdx >= FOOTBALL_CATS.length) { room.phase = 'results'; g.currentLot=null; return; }
      cat = FOOTBALL_CATS[g.footballCatIdx];
      g.footballQueue = buildFootballQueue(cat);
      g.skipsUsed = 0;
    }
    const wanting = bidders.map((p,i)=>i).filter(i => playerNeedsCat(bidders[i], cat));
    if (!wanting.length) { room.phase='results'; g.currentLot=null; return; }
    let cand = g.footballQueue.shift();
    if (!cand) { g.footballQueue = buildFootballQueue(cat); cand = g.footballQueue.shift(); }
    g.currentLot = { name: cand[0], r: cand[1], cat };
    startLotMode(g, wanting);
  } else {
    if (bidders.every(p => p.items.length >= 5)) { room.phase='results'; g.currentLot=null; return; }
    const wanting = bidders.map((p,i)=>i).filter(i => playerNeedsFlat(bidders[i]));
    if (!wanting.length) { room.phase='results'; g.currentLot=null; return; }
    const next = g.itemPool.shift();
    if (!next) { room.phase='results'; g.currentLot=null; return; }
    g.currentLot = { name: next.name, r: next.r, cat: null };
    startLotMode(g, wanting);
  }
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
  const bidders = room.players.filter(p => p.role !== 'host');
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
  g.mode = 'idle'; g.currentLot = null;
  g.openerIdx = 1 - g.openerIdx;
  drawNextLot(room);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch(e){ return json(400, { error: 'Bad JSON' }); }
  const { action } = body;
  const s = store();

  try {
    if (action === 'create') {
      const code = roomCodeGen();
      const themeResolved = resolveThemeItems(body.theme || {});
      const hostMode = body.hostMode === '3p' ? '3p' : '2p';
      const room = {
        code, hostMode, phase: 'lobby',
        theme: { key: (body.theme&&body.theme.themeKey)||'backyard', name: themeResolved.name, emoji: themeResolved.emoji,
                 football: themeResolved.football, items: themeResolved.items || null, custom: body.theme&&body.theme.customTheme || null },
        players: [ { nickname: body.nickname, role: hostMode==='3p' ? 'host' : 'creator', budget: 20, items: [] } ],
        game: null,
        rev: 1
      };
      await s.setJSON(code, room);
      return json(200, { room });
    }

    if (action === 'join') {
      const code = body.roomCode;
      if (!code) return json(400, { error: 'Missing room code' });
      const got = await s.getWithMetadata(code, { type: 'json' });
      if (!got || !got.data) return json(404, { error: 'Room not found' });
      const room = got.data;
      const needed = room.hostMode === '3p' ? 3 : 2;
      if (room.players.length >= needed) return json(400, { error: 'Room is full' });
      if (room.players.some(p => p.nickname === body.nickname)) return json(400, { error: 'Nickname already taken in this room' });
      room.players.push({ nickname: body.nickname, role: 'bidder', budget: 20, items: [] });
      if (room.players.length === needed) {
        room.phase = 'drafting';
        room.game = newGame(resolveThemeItems({ themeKey: room.theme.key, customTheme: room.theme.custom }));
        drawNextLot(room);
      }
      const ok = await s.setJSON(code, room, { onlyIfMatch: got.etag });
      if (!ok) return json(409, { error: 'Room changed, please retry' });
      return json(200, { room });
    }

    if (action === 'state') {
      const code = body.roomCode;
      const got = await s.get(code, { type: 'json' });
      if (!got) return json(404, { error: 'Room not found' });
      return json(200, { room: got });
    }

    if (action === 'raise' || action === 'pass' || action === 'skip' || action === 'claim') {
      const code = body.roomCode;
      const got = await s.getWithMetadata(code, { type: 'json' });
      if (!got || !got.data) return json(404, { error: 'Room not found' });
      const room = got.data;
      if (room.phase !== 'drafting' || !room.game || !room.game.currentLot) return json(400, { error: 'No active lot' });
      const g = room.game;
      const bidders = room.players.filter(p => p.role !== 'host');
      const myIdx = bidders.findIndex(p => p.nickname === body.nickname);
      if (myIdx < 0) return json(403, { error: 'Not a bidder in this room' });

      if (action === 'raise') {
        if (g.mode !== 'contested' || g.turnIdx !== myIdx) return json(400, { error: 'Not your turn' });
        const amount = parseInt(body.amount, 10);
        if (!(amount > g.currentBid) || amount > bidders[myIdx].budget) return json(400, { error: 'Invalid raise' });
        g.currentBid = amount; g.currentBidderIdx = myIdx; g.passStreak = 0;
        g.tickerLog.push(`${bidders[myIdx].nickname}: $${amount}`);
        g.turnIdx = 1 - g.turnIdx;
      } else if (action === 'pass') {
        if (g.mode !== 'contested' || g.turnIdx !== myIdx) return json(400, { error: 'Not your turn' });
        if (g.currentBidderIdx === null) {
          g.passStreak = (g.passStreak||0) + 1;
          if (g.passStreak >= 2) { unsoldLot(room); }
          else { g.turnIdx = 1 - g.turnIdx; }
        } else {
          resolveLotWinner(room, g.currentBidderIdx, g.currentBid);
        }
      } else if (action === 'skip') {
        if (g.mode !== 'solo' || g.soloPlayerIdx !== myIdx) return json(400, { error: 'Not your turn' });
        g.skipsUsed++;
        if (g.skipsUsed >= 4) {
          // 4th attempt: auto-given the CURRENT (not a new) candidate
          resolveLotWinner(room, myIdx, bidders[myIdx].budget === 0 ? 0 : 1);
        } else {
          const cat = g.currentLot.cat;
          let cand = g.isFootball ? g.footballQueue.shift() : g.itemPool.shift();
          if (cand) g.currentLot = g.isFootball ? { name: cand[0], r: cand[1], cat } : { name: cand.name, r: cand.r, cat: null };
        }
      } else if (action === 'claim') {
        if (g.mode !== 'solo' || g.soloPlayerIdx !== myIdx) return json(400, { error: 'Not your turn' });
        const budget = bidders[myIdx].budget;
        let amount = budget === 0 ? 0 : Math.max(1, Math.min(budget, parseInt(body.amount,10) || 1));
        resolveLotWinner(room, myIdx, amount);
      }

      const ok = await s.setJSON(code, room, { onlyIfMatch: got.etag });
      if (!ok) return json(409, { error: 'Someone else acted first, refresh' });
      return json(200, { room });
    }

    if (action === 'newRound') {
      const code = body.roomCode;
      const got = await s.getWithMetadata(code, { type: 'json' });
      if (!got || !got.data) return json(404, { error: 'Room not found' });
      const room = got.data;
      const requester = room.players.find(p => p.nickname === body.nickname);
      if (!requester || (requester.role !== 'host' && requester.role !== 'creator')) {
        return json(403, { error: 'Only the host can start a rematch' });
      }
      const themeResolved = resolveThemeItems(body.theme || {});
      room.theme = { key: (body.theme&&body.theme.themeKey)||room.theme.key, name: themeResolved.name, emoji: themeResolved.emoji,
                     football: themeResolved.football, items: themeResolved.items || null, custom: body.theme&&body.theme.customTheme || null };
      room.players.forEach(p => { p.budget = 20; p.items = []; });
      room.phase = 'drafting';
      room.game = newGame(themeResolved);
      drawNextLot(room);
      const ok = await s.setJSON(code, room, { onlyIfMatch: got.etag });
      if (!ok) return json(409, { error: 'Room changed, please retry' });
      return json(200, { room });
    }

    return json(400, { error: 'Unknown action' });
  } catch (err) {
    return json(500, { error: err.message || 'Server error' });
  }
};
