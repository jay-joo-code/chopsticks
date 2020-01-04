import React from 'react';
import styled from 'styled-components';
import User from './User';
import CartIcon from './CartIcon';
import ShopIcon from './ShopIcon';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const NavCond = () => (
  <Container>
    <CartIcon />
    <User />
    <ShopIcon />
  </Container>
);

export default NavCond;
