// functions/api/symbols.js
// 나스닥 상장 심볼 목록을 가져와 JSON으로 반환 (5분 캐시)
// 소스: https://old.nasdaqtrader.com/dynamic/SymDir/nasdaqlisted.txt (pipe-delimited)

const SRC = "https://old.nasdaqtrader.com/dynamic/SymDir/nasdaqlisted.txt";

export async function onRequestGet() {
  try {
    const res = await fetch(SRC, { cf: { cacheTtl: 300, cacheEverything: true } });
    if (!res.ok) return new Response(JSON.stringify({ error: "source error" }), { status: 502, headers:{ "content-type":"application/json" }});
    const txt = await res.text();

    // 1행 헤더, 마지막행 "File Creation Time" 제거
    const lines = txt.trim().split(/\r?\n/).filter(l => !l.startsWith("File Creation Time"));
    const header = lines.shift()?.split("|") || [];
    const idx = Object.fromEntries(header.map((h,i)=>[h.toLowerCase(), i]));

    const items = lines.map(line => {
      const cols = line.split("|");
      return {
        symbol: cols[idx.symbol],
        name: cols[idx["security name"]],
        etf: cols[idx.etf] === "Y",
        test: cols[idx["test issue"]] === "Y",
        nextshares: cols[idx.nextshares] === "Y",
      };
    })
    .filter(r => r.symbol && !r.test); // 테스트 심볼 제외

    return new Response(JSON.stringify({ exchange: "NASDAQ", count: items.length, items }), {
      headers: { "content-type": "application/json", "cache-control": "public, max-age=300" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "bad request" }), { status: 400, headers:{ "content-type":"application/json" }});
  }
}
