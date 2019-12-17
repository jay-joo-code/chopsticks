import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import Sandwich from './Sandwich';
import NavOptions from './NavOptions';

const SandwichCond = styled(Sandwich)`
  @media(min-width: ${theme.desktopContentWidth}px) {
    display: none;
  }
`;

const NavOptionsCond = styled(NavOptions)`
  display: none;
  
  @media(min-width: ${theme.desktopContentWidth}px) {
    display: block;
  }
`;

const Nav = () => (
  <div>
    <SandwichCond />
    <NavOptionsCond />
  </div>
);

export default Nav;
