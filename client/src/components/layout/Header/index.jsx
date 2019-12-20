import React from 'react';
import styled from 'styled-components';
import DynamicContainer from 'src/components/layout/DynamicContainer';
import Logo from './Logo';
import Nav from './Nav';
import ExtendedNav from './ExtendedNav';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => (
  <div>
    <DynamicContainer>
      <Container>
        <Logo />
        <Nav />
      </Container>
    </DynamicContainer>
    <ExtendedNav />
  </div>
);

export default Header;
