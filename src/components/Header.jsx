import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderBar = styled.header`
  width: 100vw;
  background: #fff;
  border-bottom: 1px solid #ececec;
  padding: 0.8rem 0 0.7rem 0;
  box-shadow: 0 1px 8px -4px #b6b6ff10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  font-size: 1.35rem;
  font-weight: 900;
  color: #5c5cff;
  letter-spacing: -1.5px;
  text-decoration: none;
  padding-left: 2vw;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  padding-right: 2vw;
`;

const NavLink = styled(Link)`
  font-size: 1.1rem;
  color: #333;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
  &:hover { color: #5c5cff; }
`;

function Header() {
  return (
    <HeaderBar>
      <Logo to="/">KIMCHIJJIM</Logo>
      <Nav>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/about">About</NavLink>
      </Nav>
    </HeaderBar>
  );
}

export default Header;
