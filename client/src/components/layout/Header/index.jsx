import React from 'react';
import styled from 'styled-components';
import DynamicContainer from 'src/components/layout/DynamicContainer';
import Logo from './Logo';
import Nav from './Nav';

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
