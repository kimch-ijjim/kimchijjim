import styled from "styled-components";
import { motion } from "framer-motion";
import { glitch } from "../styles/animations";

// 재사용 가능한 Hero(히어로) 컴포넌트
export const HeroSectionWrapper = styled(motion.div)`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 0;
  position: relative;
  overflow: hidden;
`;

export const HeroImage = styled.img`
  width: 320px;
  margin: 0 auto 2.6rem auto;
  display: block;
  filter: drop-shadow(0 8px 32px #1111);
`;

export const HeroTitle = styled(motion.h1)`
  font-size: clamp(4.5rem, 9vw, 8.5rem);
  font-weight: 900;
  margin: 0 0 2.1rem 0;
  color: #111;
  letter-spacing: -7px;
  line-height: 1.04;
  text-shadow:
    0 2px 24px #2e2e83bb,
    0 1px 0 #fff,
    0 0px 2px #5c5cff99;
  animation: ${glitch} 1.7s infinite linear alternate;
  filter: brightness(1.08) contrast(1.15);
  user-select: none;
  position: relative;
`;

export const HeroAutograph = styled(motion.img)`
  width: 110px;
  position: absolute;
  right: 3vw;
  bottom: 3vh;
  opacity: 0.74;
  filter: drop-shadow(0 4px 18px #5c5cff40) grayscale(0.2);
  animation: ${glitch} 2.2s infinite alternate;
  transition: opacity 0.45s, filter 0.45s;
  z-index: 2;
  pointer-events: none;
`;

export const HeroSub = styled.div`
  font-size: 1.18rem;
  font-weight: 400;
  margin-bottom: 2.7rem;
  color: #444;
  letter-spacing: 0.02em;
`;
