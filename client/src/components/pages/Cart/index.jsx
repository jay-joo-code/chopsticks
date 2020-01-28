import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CartUI from './CartUI';
import CartEmpty from './CartEmpty';

const Cart = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  if (!user) {
    history.push('/login');
    return <div />;
  }
  else if (!user.cart.length) return <CartEmpty />;
  return <CartUI />;
};

export default Cart;
