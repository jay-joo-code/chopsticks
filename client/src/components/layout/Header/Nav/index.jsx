import React from 'react';
import styled from 'styled-components';
import UserSection from './UserSection';
import CartIcon from './CartIcon';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const NavCond = () => (
  <Container>
    <CartIcon />
    <UserSection />
  </Container>
);

export default NavCond;
