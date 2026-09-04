const { getStore, connectLambda } = require('@netlify/blobs');

function store(){
  // see note in room.js store() — 'strong' consistency isn't usable in this
  // function runtime mode, default eventual consistency used instead.
  return getStore({ name: 'ai-prefs' });
}
function json(statusCode, body){
  return { statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
}
// keys are bucketed into a small number of blobs (by first char) to avoid read/write
// contention on a single giant JSON object as usage grows.
function bucketFor(itemKey){
  const c = (itemKey || 'x').replace(/[^a-zA-Z0-9]/g,'').charAt(0).toLowerCase() || 'x';
  return 'bucket-' + (c.match(/[a-z]/) ? c : 'misc');
}

exports.handler = async (event) => {
  connectLambda(event);
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch(e){ return json(400, { error: 'Bad JSON' }); }
  const { action, itemKey } = body;
  if (!itemKey) return json(400, { error: 'Missing itemKey' });
  const s = store();
  const bucket = bucketFor(itemKey);

  try {
    if (action === 'get') {
      const data = await s.get(bucket, { type: 'json' });
      const rec = data && data[itemKey];
      return json(200, { avg: rec ? Math.round(rec.sum / rec.count) : null, count: rec ? rec.count : 0 });
    }

    if (action === 'record') {
      const amount = parseInt(body.amount, 10);
      if (!(amount >= 0)) return json(400, { error: 'Invalid amount' });
      const got = await s.getWithMetadata(bucket, { type: 'json' });
      const data = (got && got.data) || {};
      const rec = data[itemKey] || { sum: 0, count: 0 };
      rec.sum += amount; rec.count += 1;
      data[itemKey] = rec;
      const ok = got && got.etag
        ? await s.setJSON(bucket, data, { onlyIfMatch: got.etag })
        : await s.setJSON(bucket, data);
      if (!ok) {
        // lost a race with another writer — retry once against fresh data
        const got2 = await s.getWithMetadata(bucket, { type: 'json' });
        const data2 = (got2 && got2.data) || {};
        const rec2 = data2[itemKey] || { sum: 0, count: 0 };
        rec2.sum += amount; rec2.count += 1;
        data2[itemKey] = rec2;
        await s.setJSON(bucket, data2, got2 && got2.etag ? { onlyIfMatch: got2.etag } : undefined);
      }
      return json(200, { ok: true });
    }

    return json(400, { error: 'Unknown action' });
  } catch (err) {
    return json(500, { error: err.message || 'Server error' });
  }
};
