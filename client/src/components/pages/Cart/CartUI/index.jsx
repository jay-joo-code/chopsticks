import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CartList from './CartList';
import OrderDetails from './OrderDetails';
import Checkout from './Checkout';
import useRouter from 'src/util/hooks/useRouter';

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
  const [method, setMethod] = useState();
  const router = useRouter();
  useEffect(() => {
    if (router.query.checkout) {
      setExpanded(true);
      router.updateQuery({ checkout: undefined });
    }
  }, [])

  return (
    <Container>
      {expanded && <Checkout method={method} setMethod={setMethod}/>}
      <CartSection>
        <CartList cart={cart} />
        <OrderDetails
          cart={cart}
          expanded={expanded}
          setExpanded={setExpanded}
          method={method}
        />
      </CartSection>
    </Container>
  );
};

export default CartUI;
