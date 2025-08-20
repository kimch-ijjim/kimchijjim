import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 컴포넌트 import
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalStyle from "./styles/GlobalStyle";

// 페이지 컴포넌트 import
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import About from "./pages/About";
// 1. Project1 -> ProjectDetailPage로 이름 변경 (더 명확한 이름)
import ProjectDetailPage from "./pages/Project1/Project1"; 
import NotFound from "./pages/NotFound"; // NotFound 페이지 import 추가

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          {/* 2. 동적 라우팅으로 변경 (예: /portfolio/project-1, /portfolio/project-2 등 모두 처리) */}
          <Route path="/portfolio/:projectId" element={<ProjectDetailPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          
          {/* 3. 중복된 /about 경로 제거 */}

          {/* 4. '페이지 없음(Not Found)'을 위한 경로 추가 */}
          {/* 위에서 일치하는 경로가 없을 경우, 가장 마지막에 있는 이 라우트가 잡힙니다. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;