import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CartList from './CartList';
import Checkout from './Checkout';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3rem 0;
  flex-wrap: wrap;
`;

const CartUI = () => {
  const user = useSelector((state) => state.user);
  const cart = user && user.cart;
  
  return (
    <Container>
      <CartList cart={cart} />
      <Checkout cart={cart} />
    </Container>
  )
};

export default CartUI;
