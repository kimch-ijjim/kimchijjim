import AnimatedSection from "../components/AnimatedSection";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <AnimatedSection
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
    >
      <h1 style={{
        fontSize: "2.4rem",
        fontWeight: 900,
        letterSpacing: "-2.5px",
        marginBottom: "1.4rem",
        color: "#6366f1"
      }}>
        404 Not Found
      </h1>
      <div style={{
        color: "#444",
        fontSize: "1.19rem",
        marginBottom: "1.8rem",
        textAlign: "center"
      }}>
        페이지를 찾을 수 없습니다.<br />
        <span style={{ color: "#aaa" }}>The page you are looking for does not exist.</span>
      </div>
      <Link to="/" style={{
        color: "#fff",
        background: "#6366f1",
        borderRadius: "1.2rem",
        padding: "0.9rem 2.1rem",
        fontWeight: 700,
        fontSize: "1.01rem",
        textDecoration: "none",
        boxShadow: "0 2px 8px -3px #6366f133"
      }}>
        홈으로 돌아가기
      </Link>
    </AnimatedSection>
  );
}
export default NotFound;
