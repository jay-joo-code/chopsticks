import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CartSVG } from 'src/assets/svgs/cart.svg';
import Notification from 'src/components/common/Notification';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
  padding: .5rem .5rem 0 .5rem;
  margin-bottom: .5rem;
  position: relative;
`;

const IconContainer = styled.div`
`

const CartIcon = () => {
  const user = useSelector((state) => state.user);
  const cartItemsCount = user && user.cart ? user.cart.length : 0;
  return (
    <Container>
      <Link to="/cart">
        <Notification text={cartItemsCount} />
        <IconContainer>
          <CartSVG />
        </IconContainer>
      </Link>
    </Container>
  );
};

export default CartIcon;
