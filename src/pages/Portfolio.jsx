import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const Section = styled(motion.section)`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  background: #f7f9ff;
  padding: 8rem 2rem; /* 상단 여백을 넉넉하게 추가 */
`;

const Title = styled.h2`
  font-size: clamp(2.1rem, 5vw, 3.4rem);
  font-weight: 900;
  color: #111;
  letter-spacing: -3px;
  margin-bottom: 3.5rem; /* 타이틀과 목록 사이 여백 추가 */
`;

const ProjectList = styled.div`
  width: 90vw;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const ProjectItem = styled(motion(Link))`
  display: block;                   /* Link를 카드처럼 */
  text-decoration: none;
  background: #fff;
  border-radius: 1rem;
  padding: 2.3rem 2.5rem;
  color: #232323;
  border: 1px solid #e9e9fd;
  box-shadow: 0 4px 18px -8px #5c5cff1c;
  transition: all .3s ease-in-out;
  &:hover {
    transform: translateY(-3px) scale(1.02);
    border-color: #9393ff;
    box-shadow: 0 10px 25px -8px #5c5cff33;
  }
  b{ font-size:1.2rem; font-weight:700; color:#1a1a1a; }
  span{ display:block; margin-top:.25rem; color:#555; }
`;

function Portfolio() {
  return (
    <Section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
    >
      <Title>Portfolio</Title>
      <ProjectList>
        {projects.map((project, index) => (
          <ProjectItem
            key={project.id}
            to={`/portfolio/${project.id}`}
            whileHover={{ scale: 1.025, y: -3 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
          >
            <b>#{index + 1} {project.title}</b>
          </ProjectItem>
        ))}
      </ProjectList>
    </Section>
  );
}

export default Portfolio;