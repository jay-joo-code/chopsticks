import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoSVG } from 'src/assets/images/logo.svg';

const Container = styled(Link)`
  font-size: 5rem;
  height: 1em;
`;

const StyledLogo = styled(LogoSVG)`
  height: 1em;
  width: 1em;
`;

const Logo = () => (
  <Container to="/">
    <StyledLogo />
  </Container>
);

export default Logo;
