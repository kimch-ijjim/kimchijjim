import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled(motion.section)`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f9faff;
  padding: 0;
`;

const Title = styled.h2`
  font-size: clamp(2.1rem, 5vw, 3.4rem);
  font-weight: 900;
  color: #111;
  letter-spacing: -3px;
  margin-bottom: 2.5rem;
`;

const Info = styled.div`
  width: 90vw; max-width: 720px;
  background: #fff;
  border-radius: 1.3rem;
  box-shadow: 0 4px 18px -8px #5c5cff18;
  padding: 2.8rem 2.5rem;
  font-family: 'Manrope', 'Inter', sans-serif;
  font-size: 1.12rem;
  font-weight: 500;
  color: #232323;
  text-align: center;
`;

function About() {
  return (
    <Section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
    >
      <Title>About</Title>
      <Info>Coming Soon...</Info>
    </Section>
  );
}
export default About;
