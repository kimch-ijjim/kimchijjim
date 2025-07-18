import styled from "styled-components";
import { SITE } from "../config";

const Foot = styled.footer`
  width: 100vw;
  background: #fff;
  color: #858585;
  text-align: center;
  font-size: 1.05rem;
  padding: 3rem 0 1.5rem 0;
  margin-top: 6rem;
  border-top: 1.2px solid #e6e6e6;
  letter-spacing: .01em;
`;

function Footer() {
  return (
    <Foot>
      © {new Date().getFullYear()} {SITE.TITLE} | All Rights Reserved
    </Foot>
  );
}
export default Footer;
