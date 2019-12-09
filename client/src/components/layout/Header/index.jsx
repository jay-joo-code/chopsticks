import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import CreateButton from './CreateButton';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100vw
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  padding: 15px 0;
  
  @media (min-width: 768px) {
      width: 768px;
  }
`;

const Header = () => (
  <Wrapper>
    <Container>
      <Logo />
      <CreateButton />
    </Container>
  </Wrapper>
);

export default Header;
