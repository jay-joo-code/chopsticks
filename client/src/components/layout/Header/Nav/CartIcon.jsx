import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CartSVG } from 'src/assets/svgs/cart.svg';
import Notification from 'src/components/common/Notification';

const Container = styled.div`
  padding: .5rem;
  margin-right: .5rem;
  position: relative
`;

const CartIcon = () => (
  <Container>
    <Notification text="2" />
    <CartSVG />
  </Container>
);

export default CartIcon;
