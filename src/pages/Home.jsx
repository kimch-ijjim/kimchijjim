import {
  HeroSectionWrapper,
  HeroImage,
  HeroTitle,
  HeroAutograph,
  HeroSub,
} from "../components/HeroSection";
import heroImg from "../assets/main.svg";
import autographImg from "../assets/autograph.svg";
import { motion } from "framer-motion";
import styled from "styled-components";

const MainText = styled(motion.div)`
  max-width: 830px;
  text-align: center;
  font-family: 'Manrope', 'Inter', sans-serif;
`;

const ScrollAni = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5vh;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Arrow = styled.div`
  font-size: 2.2rem;
  color: #5c5cff;
  opacity: 0.22;
`;

const ScrollText = styled.div`
  font-size: 1.1rem;
  color: #8c9eff;
  opacity: 0.55;
  font-weight: 400;
  letter-spacing: 0.08em;
  margin-top: 0.1rem;
  text-align: center;
  user-select: none;
`;

function Home() {
  return (
    <HeroSectionWrapper
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 1.08, ease: [0.77, 0, 0.175, 1] }}
    >
      <HeroAutograph
        src={autographImg}
        alt="autograph"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.74, y: 0 }}
        transition={{ delay: 0.2, duration: 1.3, type: "spring" }}
      />
      <MainText>
        <HeroImage src={heroImg} alt="메인 일러스트" />
        <HeroTitle
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
        >
          KIMCHIJJIM
        </HeroTitle>
        <HeroSub>
          Hmm....
        </HeroSub>
      </MainText>
      <ScrollAni>
        <Arrow>↓</Arrow>
        <ScrollText>Scroll</ScrollText>
      </ScrollAni>
    </HeroSectionWrapper>
  );
}

export default Home;
