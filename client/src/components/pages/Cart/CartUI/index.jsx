import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CartList from './CartList';
import OrderDetails from './OrderDetails';
import Checkout from './Checkout';

const Container = styled.div`

`;

const CartSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3rem 0;
`;

const CartUI = () => {
  const user = useSelector((state) => state.user);
  const cart = user && user.cart;
  const [expanded, setExpanded] = useState(false);

  return (
    <Container>
      {expanded && <Checkout />}
      <CartSection>
        <CartList cart={cart} />
        <OrderDetails
          cart={cart}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </CartSection>
    </Container>
  );
};

export default CartUI;
