import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`

`;

const CartUI = () => {
  const user = useSelector((state) => state.user);
  
  return (
    <Container>
        CartUI
    </Container>
  )
};

export default CartUI;
