// src/App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";

// 레이아웃 및 페이지
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// 상세 페이지는 코드 스플리팅 (lazy)
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetail"));

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* 공통 헤더/푸터가 필요한 페이지 */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* 전체 화면(헤더/푸터 제외) 상세 페이지 */}
          <Route
            path="/portfolio/:projectId"
            element={
              <Suspense fallback={<div style={{ padding: 32 }}>Loading…</div>}>
                <ProjectDetailPage />
              </Suspense>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
