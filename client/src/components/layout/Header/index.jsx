import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Nav from './Nav';
import DynamicContainer from 'src/components/layout/DynamicContainer';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => (
  <DynamicContainer>
    <Container>
      <Logo />
      <Nav />
    </Container>
  </DynamicContainer>
);

export default Header;
