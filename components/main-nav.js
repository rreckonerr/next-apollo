import Link from "next/link";
import styled from "styled-components";
import { media } from "../styles";

const NavWrapper = styled.nav`
  display: flex;
  justify-content: center;

  padding: 1rem;
  /* border-bottom: 0.06rem solid ${({ theme }) => theme.color.primaryDark}; */

  background: ${({ theme }) => theme.color.primaryDark};

  ${({ theme }) => media.desktop`background: ${theme.color.secondaryDark}`}
  ${media.tablet`background: pink;`}
  ${media.phone`background: black;`}

  box-shadow: 0 2px 4px rgba(0,0,0,.5);
`;

const NavLinks = styled.div`
`;

// anchor styles are set inline because otherwise style is not applied on initial load

const Nav = () => (
  <NavWrapper>
    <NavLinks>
      <Link href="/">
      <a style={{  textDecoration: 'none', color: '#ffffff', textTransform: 'uppercase', cursor: 'pointer'}}>
        Apollo-Next
      </a>
      </Link>
    </NavLinks>
  </NavWrapper>
);

export default Nav;
