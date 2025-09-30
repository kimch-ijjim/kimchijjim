import { onRequestGet as __api_candles_js_onRequestGet } from "C:\\Users\\LJE\\Desktop\\proto-main\\functions\\api\\candles.js"
import { onRequestGet as __api_symbols_js_onRequestGet } from "C:\\Users\\LJE\\Desktop\\proto-main\\functions\\api\\symbols.js"
import { onRequestPost as __indicators_rsi_js_onRequestPost } from "C:\\Users\\LJE\\Desktop\\proto-main\\functions\\indicators\\rsi.js"

export const routes = [
    {
      routePath: "/api/candles",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_candles_js_onRequestGet],
    },
  {
      routePath: "/api/symbols",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_symbols_js_onRequestGet],
    },
  {
      routePath: "/indicators/rsi",
      mountPath: "/indicators",
      method: "POST",
      middlewares: [],
      modules: [__indicators_rsi_js_onRequestPost],
    },
  ]