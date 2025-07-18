import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;900&display=swap');
  body {
    background: #fff;
    color: #181c22;
    font-family: 'Manrope', 'Inter', 'Pretendard', sans-serif;
    margin: 0;
    padding: 0;
    font-size: 18px;
    letter-spacing: -0.01em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * { box-sizing: border-box; }
  a { color: inherit; text-decoration: none; }
`;

export default GlobalStyle;
