function calcRSI(closes, period = 14) {
  if (!Array.isArray(closes) || closes.length < period + 1) return [];
  const gains = [], losses = [];
  for (let i = 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    gains.push(d > 0 ? d : 0);
    losses.push(d < 0 ? -d : 0);
  }
  let avgGain = gains.slice(0, period).reduce((a,b)=>a+b,0)/period;
  let avgLoss = losses.slice(0, period).reduce((a,b)=>a+b,0)/period;

  const rsi = new Array(closes.length).fill(undefined);
  rsi[period] = avgLoss === 0 ? 100 : 100 - (100 / (1 + (avgGain / avgLoss)));

  for (let i = period + 1; i < closes.length; i++) {
    avgGain = ((avgGain * (period - 1)) + gains[i - 1]) / period;
    avgLoss = ((avgLoss * (period - 1)) + losses[i - 1]) / period;
    rsi[i] = avgLoss === 0 ? 100 : 100 - (100 / (1 + (avgGain / avgLoss)));
  }
  return rsi.filter(x => Number.isFinite(x));
}

export async function onRequestPost({ request }) {
  try {
    const body = await request.json();
    const closes = Array.isArray(body?.closes) ? body.closes.map(Number) : [];
    const period = Number(body?.period ?? 14);
    if (!closes.length || period < 2) {
      return new Response(JSON.stringify({ error: "invalid input" }), {
        status: 400, headers: { "content-type": "application/json" }
      });
    }
    const rsi = calcRSI(closes, period);
    return new Response(JSON.stringify({ rsi }), {
      headers: { "content-type": "application/json" }
    });
  } catch {
    return new Response(JSON.stringify({ error: "bad request" }), {
      status: 400, headers: { "content-type": "application/json" }
    });
  }
}
