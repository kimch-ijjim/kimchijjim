"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Project2.css";

const calculateMACD = (data, fast = 12, slow = 26, signal = 9) => {
  const closes = data.map(d => d.close);
  const ema = (src, prd) => {
    if (src.length < prd) return [];
    const multiplier = 2 / (prd + 1);
    const result = Array(src.length).fill(undefined);
    let sma = 0;
    for (let i = 0; i < prd; i++) { sma += src[i]; }
    result[prd - 1] = sma / prd;
    for (let i = prd; i < src.length; i++) { result[i] = (src[i] - result[i - 1]) * multiplier + result[i - 1]; }
    return result;
  };
  const emaFast = ema(closes, fast);
  const emaSlow = ema(closes, slow);
  
  const dif = Array(closes.length).fill(undefined)
  for (let i = slow - 1; i < closes.length; i++) { dif[i] = emaFast[i] - emaSlow[i] }
  
  const dea = ema(dif.filter(v => v !== undefined), signal);
  let deaIdx = 0;
  const finalDea = dif.map(v => (v !== undefined) ? dea[deaIdx++] : undefined);
  
  const macd = Array(dif.length).fill(undefined)
  for (let i = signal - 1; i < dif.length; i++) { macd[i] = dif[i] - finalDea[i - signal + 1] }

  // const macd = dif.map((val, i) => (val === undefined || finalDea[i] === undefined) ? undefined : val - finalDea[i]);
  
  return data.map((d, i) => ({ ...d, dif: dif[i], dea: finalDea[i], macd: macd[i] }));
};
const VALID_RANGES = { "1m": ["1d", "5d"], "5m": ["1d", "5d", "1mo"], "1h": ["1d", "5d", "1mo"], "1d": ["1d", "5d", "1mo", "3mo", "6mo", "1y", "max"] };

const RSI_COLORS = {
  rsi1: '#f28b21',
  rsi2: '#8738e5',
  rsi3: '#3c79f2',
};

export default function Project2() {
  const [inputText, setInputText] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [range, setRange] = useState("1mo");
  const [interval, setInterval] = useState("1d");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const chartBoxRef = useRef(null);
  const chartRef = useRef(null);
  const initedRef = useRef(false);
  const rsiPaneIdRef = useRef(null);
  const [pendingData, setPendingData] = useState(null);

  const [rsiLineVisibilities, setRsiLineVisibilities] = useState({
    rsi1: true,
    rsi2: true,
    rsi3: true,
  });

  const applyRsiVisibility = useCallback((chart, visibilities) => {
    console.log("--- 🕵️‍♂️ RSI 가시성 변경 진단 시작 ---");
    if (!chart || !rsiPaneIdRef.current) {
        console.error("⛔ 진단 실패: 차트 또는 RSI Pane ID를 찾을 수 없습니다.");
        return;
    }

    const indicatorMapBefore = chart.getIndicatorByPaneId(rsiPaneIdRef.current);
    const indicatorInfoBefore = indicatorMapBefore?.get('RSI');
    console.log("✅ 1단계: 변경 전 RSI 지표 객체:", indicatorInfoBefore);
    if (indicatorInfoBefore?.styles) {
        console.log("🔑 변경 전 스타일 (스냅샷):", JSON.parse(JSON.stringify(indicatorInfoBefore.styles)));
    } else {
        console.warn("⚠️ 변경 전 스타일 정보를 찾을 수 없습니다.");
    }

    const overrideOptions = {
        id: rsiPaneIdRef.current,
        styles: {
            rsi1: { color: visibilities.rsi1 ? RSI_COLORS.rsi1 : 'transparent' },
            rsi2: { color: visibilities.rsi2 ? RSI_COLORS.rsi2 : 'transparent' },
            rsi3: { color: visibilities.rsi3 ? RSI_COLORS.rsi3 : 'transparent' },
        }
    };
    console.log("▶️ 2단계: overrideIndicator 호출, 전달 옵션:", overrideOptions);
    chart.overrideIndicator(overrideOptions);

    const indicatorMapAfter = chart.getIndicatorByPaneId(rsiPaneIdRef.current);
    const indicatorInfoAfter = indicatorMapAfter?.get('RSI');
    console.log("✅ 3단계: 변경 후 RSI 지표 객체:", indicatorInfoAfter);
    if (indicatorInfoAfter?.styles) {
        console.log("🔑 변경 후 스타일 (스냅샷):", JSON.parse(JSON.stringify(indicatorInfoAfter.styles)));
    } else {
        console.warn("⚠️ 변경 후 스타일 정보를 찾을 수 없습니다.");
    }

    console.log("▶️ 4단계: resize() 호출");
    chart.resize();
    console.log("--- ✅ 진단 종료 ---");
  }, []);

  useEffect(() => {
    const validRangesForInterval = VALID_RANGES[interval] || [];
    if (!validRangesForInterval.includes(range)) {
      setRange(validRangesForInterval[validRangesForInterval.length - 1]);
    }
  }, [interval, range]);

  const fetchAndRender = useCallback(async (sym = selectedSymbol) => {
    if (!sym) return;
    setLoading(true); setErrorMsg("");
    try {
      const res = await fetch(
        `/api/candles?symbol=${encodeURIComponent(sym)}&interval=${interval}&range=${range}`,
        { headers: { Accept: "application/json" } }
      );

      const ct = res.headers.get("content-type") || "";
      const isJson = ct.includes("application/json");

      let body;
      try {
        body = isJson ? await res.json() : await res.text();
      } catch (err) {
        throw new Error(`응답 파싱 실패 (${ct}): ${err.message}`);
      }

      if (!res.ok) {
        const hint = isJson ? (body?.error ?? JSON.stringify(body)) : String(body).slice(0, 300);
        throw new Error(`HTTP ${res.status} - ${hint}`);
      }

      if (!isJson) {
        const head = String(body).slice(0, 300).replace(/\s+/g, " ");
        throw new Error(`API가 JSON이 아닌 ${ct}을 반환함. 본문 앞부분: ${head}`);
      }

      const j = body;
      const candles = Array.isArray(j?.candles) ? j.candles : [];
      if (!candles.length) throw new Error("유효한 캔들 데이터가 없습니다.");

      let data = candles.map(c => ({
        timestamp: Number(c.t) < 1e11 ? Number(c.t) * 1000 : Number(c.t),
        open: Number(c.o),
        high: Number(c.h),
        low: Number(c.l),
        close: Number(c.c),
        volume: Number(c.v),
      }));
      data = calculateMACD(data);

      const chart = chartRef.current;
      if (chart) {
        chart.applyNewData(data, true);
        chart.scrollToRealTime();
      } else {
        setPendingData(data);
      }
    } catch (e) {
      setErrorMsg(`데이터 로드 실패: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }, [range, interval, selectedSymbol]);

  useEffect(() => { if (selectedSymbol) fetchAndRender(selectedSymbol); }, [fetchAndRender, selectedSymbol]);
  
  useEffect(() => {
    if (chartRef.current) {
      applyRsiVisibility(chartRef.current, rsiLineVisibilities);
    }
  }, [rsiLineVisibilities, applyRsiVisibility]);

  useEffect(() => {
    if (initedRef.current) return;
    initedRef.current = true;
    let disposed = false;
    (async () => {
      try { chartRef.current?.dispose?.(); } catch {}
      chartRef.current = null;
      if (!chartBoxRef.current) return;
      const { init } = await import("klinecharts");
      const chart = init(chartBoxRef.current, { /* styles 생략 */ });
      if (disposed) { chart.dispose(); return; }
      chartRef.current = chart;

      chart.setPaneOptions('candle_pane', { minHeight: 320 });

      const createdRsiPaneId = chart.createIndicator(
        {
          name: 'RSI',
          calcParams: [6, 12, 24],
          styles: {
            rsi1: { color: RSI_COLORS.rsi1 },
            rsi2: { color: RSI_COLORS.rsi2 },
            rsi3: { color: RSI_COLORS.rsi3 },
          }
        },
        true,
        { minHeight: 100 }
      );
      rsiPaneIdRef.current = createdRsiPaneId;
      
      chart.createIndicator({
        name: 'MACD',
        minHeight: 120,
        paddingTop: 0,
        paddingBottom: 0,
        styles: {
          dif: { color: '#f97316' },
          dea: { color: '#a855f7' },
          macd: { color: '#a7b0d6' },
        },
        draw: ({ ctx, barSpace, visibleRange, indicator, xAxis, yAxis }) => {
          const { from, to } = visibleRange;
          const macdData = indicator.result;
          const zeroY = yAxis.convertToPixel(0);
          const barWidth = barSpace.total;
          for (let i = from; i < to; i++) {
            const data = macdData[i];
            const { macd, dif, dea } = data;
            if (macd !== undefined) {
              const x = xAxis.convertToPixel(i);
              const y = yAxis.convertToPixel(macd);
              ctx.fillStyle = macd >= 0 ? '#22c55e' : '#ef4444';
              ctx.beginPath();
              ctx.rect(x - barWidth / 2, y, barWidth, zeroY - y);
              ctx.fill();
            }
            if (i > from) {
              const prevData = macdData[i-1];
              if (dif !== undefined && prevData.dif !== undefined) {
                ctx.strokeStyle = '#f97316';
                ctx.beginPath();
                ctx.moveTo(xAxis.convertToPixel(i - 1), yAxis.convertToPixel(prevData.dif));
                ctx.lineTo(xAxis.convertToPixel(i), yAxis.convertToPixel(dif));
                ctx.stroke();
              }
              if (dea !== undefined && prevData.dea !== undefined) {
                ctx.strokeStyle = '#a855f7';
                ctx.beginPath();
                ctx.moveTo(xAxis.convertToPixel(i - 1), yAxis.convertToPixel(prevData.dea));
                ctx.lineTo(xAxis.convertToPixel(i), yAxis.convertToPixel(dea));
                ctx.stroke();
              }
            }
          }
        }
      }, true);

      const yAxisScrollZoomOption = { yAxis: { scrollZoom: true } };
      chart.setPaneOptions('candle_pane', yAxisScrollZoomOption);
      chart.setPaneOptions(createdRsiPaneId, yAxisScrollZoomOption);
      const doResize = () => { requestAnimationFrame(() => { chartRef.current?.resize(); }); };
      const ro = new ResizeObserver(doResize);
      ro.observe(chartBoxRef.current);
      doResize();
      if (pendingData?.length) { 
        chart.applyNewData(pendingData, true); 
        chart.scrollToRealTime();
      }
      return () => { disposed = true; ro.disconnect(); chartRef.current?.dispose(); chartRef.current = null; };
    })();
  }, [pendingData]);

  const applySymbol = () => { if (inputText.trim()) setSelectedSymbol(inputText.trim().toUpperCase()); };
  
  const toggleRsiLineVisibility = useCallback((lineKey) => {
    setRsiLineVisibilities(prev => ({ ...prev, [lineKey]: !prev[lineKey] }));
  }, []);

  return (
    <div className="ta-wrap safe-pad">
      <div className="ta-header"><h1>Project 2 — Technical Analysis</h1></div>
      <div className="ta-card">
        <div className="ta-controls">
          <input className="ta-input" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") applySymbol(); }} placeholder="티커입력" style={{ minWidth: 220 }} />
          <select className="ta-select" value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="1d" disabled={!VALID_RANGES[interval].includes("1d")}>1d</option>
            <option value="5d" disabled={!VALID_RANGES[interval].includes("5d")}>5d</option>
            <option value="1mo" disabled={!VALID_RANGES[interval].includes("1mo")}>1mo</option>
            <option value="3mo" disabled={!VALID_RANGES[interval].includes("3mo")}>3mo</option>
            <option value="6mo" disabled={!VALID_RANGES[interval].includes("6mo")}>6mo</option>
            <option value="1y" disabled={!VALID_RANGES[interval].includes("1y")}>1y</option>
            <option value="max" disabled={!VALID_RANGES[interval].includes("max")}>max</option>
          </select>
          <select className="ta-select" value={interval} onChange={(e) => setInterval(e.target.value)}>
            <option value="1d">1d</option>
            <option value="1h">1h</option>
            <option value="5m">5m</option>
            <option value="1m">1m</option>
          </select>
          <button className="ta-btn" onClick={() => fetchAndRender(selectedSymbol)} disabled={loading || !selectedSymbol}>
            {loading ? "Loading…" : "Reload"}
          </button>
          <div className="ta-metric">{selectedSymbol || "심볼 없음"}</div>
        </div>
        {errorMsg && <div className="ta-error">{errorMsg}</div>}
        <div className="ta-charts">
          <div className="ta-chart" ref={chartBoxRef} />
        </div>
      </div>
      <div className="rsi-toggle-buttons">
        <button className={`rsi-toggle-btn ${rsiLineVisibilities.rsi1 ? 'active' : ''}`} onClick={() => toggleRsiLineVisibility('rsi1')} title="Toggle RSI 1 Line">RSI1</button>
        <button className={`rsi-toggle-btn ${rsiLineVisibilities.rsi2 ? 'active' : ''}`} onClick={() => toggleRsiLineVisibility('rsi2')} title="Toggle RSI 2 Line">RSI2</button>
        <button className={`rsi-toggle-btn ${rsiLineVisibilities.rsi3 ? 'active' : ''}`} onClick={() => toggleRsiLineVisibility('rsi3')} title="Toggle RSI 3 Line">RSI3</button>
      </div>
    </div>
  );
}
