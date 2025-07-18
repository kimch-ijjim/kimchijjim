import { keyframes } from "styled-components";

export const glitch = keyframes`
  0% { text-shadow: 1px 0 #5c5cff, -1px 0 #ff5c8a; }
  20% { text-shadow: 2px 2px #5c5cff, -2px -2px #ff5c8a; }
  40% { text-shadow: 1px 1px #ff5c8a, -1px -1px #5c5cff; }
  60% { text-shadow: 3px 0 #5c5cff, -3px 0 #ff5c8a; }
  80% { text-shadow: -2px 2px #5c5cff, 2px -2px #ff5c8a; }
  100% { text-shadow: 1px 0 #5c5cff, -1px 0 #ff5c8a; }
`;
