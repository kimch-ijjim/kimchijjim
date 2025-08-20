import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";

// 레이아웃 및 페이지 컴포넌트 import
import Layout from "./components/Layout"; // 1. 새로 만든 Layout 컴포넌트 가져오기
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ProjectDetailPage from "./pages/Project1/Project1"; 
import Blog from "./pages/Blog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        {/* Header와 Footer를 여기서 직접 사용하지 않습니다. */}
        <Routes>
          {/* 2. 헤더와 푸터가 필요한 페이지들은 Layout 라우트의 자식으로 묶기 */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* 3. 헤더와 푸터가 필요 없는 전체 화면 페이지는 독립적으로 배치 */}
          <Route path="/portfolio/:projectId" element={<ProjectDetailPage />} />
          
          {/* NotFound 페이지는 필요에 따라 Layout 안이나 밖에 배치할 수 있습니다. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;