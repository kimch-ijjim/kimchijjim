import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #f6f8fa;
    color: #19213d;
    font-family: 'Pretendard', 'Inter', system-ui, sans-serif;
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
