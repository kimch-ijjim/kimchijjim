import motion from "framer-motion";
import styled from "styled-components";

const AnimatedSection = styled(motion.section)`
  width: 100%;
  max-width: 1100px;
  margin: 4rem auto 0 auto;
  padding: 3.2rem 4vw;
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 4px 32px -12px #6366f116;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default AnimatedSection;
