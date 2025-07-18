import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled(motion.section)`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7f9ff;
  padding: 0;
  position: relative;
`;

const Title = styled.h2`
  font-size: clamp(2.1rem, 5vw, 3.4rem);
  font-weight: 900;
  color: #111;
  letter-spacing: -3px;
  margin-bottom: 2.5rem;
`;

const ProjectList = styled.div`
  width: 90vw; max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const ProjectItem = styled(motion.div)`
  background: #fff;
  border-radius: 1.3rem;
  box-shadow: 0 4px 18px -8px #5c5cff1c;
  padding: 2.3rem 2.2rem;
  font-family: 'Manrope', 'Inter', sans-serif;
  font-size: 1.06rem;
  font-weight: 500;
  color: #232323;
  display: flex;
  flex-direction: column;
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
        <ProjectItem
          whileHover={{ scale: 1.025, y: -3 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          <b>#1</b>
          <span>Coming Soon...</span>
        </ProjectItem>
        <ProjectItem
          whileHover={{ scale: 1.025, y: -3 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          <b>#2</b>
          <span>Coming Soon...</span>
        </ProjectItem>
      </ProjectList>
    </Section>
  );
}

export default Portfolio;
