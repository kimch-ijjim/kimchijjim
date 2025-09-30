export async function onRequestGet({ request }) {
  try {
    const url = new URL(request.url);
    const raw = url.searchParams.get("symbol") || "";
    let interval = url.searchParams.get("interval") || "1d";
    let range = url.searchParams.get("range") || "6mo";

    const symbol = raw.trim().toUpperCase();
    if (!symbol) {
      return new Response(JSON.stringify({ error: "no symbol" }), { status: 400 });
    }

    // [추가] 야후 파이낸스 API 제약에 따라 range를 보정하는 로직
    // 1. 1분봉(1m)의 최대 조회 가능 기간은 7일입니다.
    if (interval === "1m" && !["1d", "5d"].includes(range)) {
      range = "7d"; // 7일이 넘는 range(1mo, 3mo 등)는 최대치인 7d로 강제 조정
    }
    // 2. 5분, 15분, 30분, 1시간봉의 최대 조회 가능 기간은 60일입니다.
    if (["5m", "15m", "30m", "1h"].includes(interval) && ["3mo", "6mo", "1y", "max"].includes(range)) {
      range = "60d"; // 60일이 넘는 range는 최대치인 60d로 강제 조정
    }

    const yfUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;

    const res = await fetch(yfUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; GPT-Guide/1.0)"
      }
    });
    if (!res.ok) {
      const errorBody = await res.text(); // 응답을 텍스트로 읽기
      console.error("Yahoo Finance로부터 받은 비정상 응답:", errorBody); // 서버 로그에 출력
      throw new Error(`yahoo fetch failed: ${res.status} - ${res.statusText}`);
    }

    const j = await res.json();
    if (j.chart?.error) {
      throw new Error(`Yahoo error: ${j.chart.error.description}`);
    }

    const result = j.chart?.result?.[0];
    if (!result) throw new Error("no result");

    const timestamps = result.timestamp || [];
    const ohlcv = result.indicators?.quote?.[0] || {};

    const candles = timestamps.map((t, i) => ({
      t: t * 1000,
      o: ohlcv.open?.[i],
      h: ohlcv.high?.[i],
      l: ohlcv.low?.[i],
      c: ohlcv.close?.[i],
      v: ohlcv.volume?.[i],
    })).filter(c => Number.isFinite(c.o) && Number.isFinite(c.c));

    return new Response(JSON.stringify({ symbol, interval, range, candles }), {
      headers: { "content-type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 502,
      headers: { "content-type": "application/json" }
    });
  }
}