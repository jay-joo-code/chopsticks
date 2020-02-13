import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import CartUI from './CartUI';
import CartEmpty from './CartEmpty';

const Cart = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user) fetchSelfAndStore(user._id);
  }, []);

  if (!user) {
    history.push('/login');
    return <div />;
  }
  if (!user.cart.length) return <CartEmpty />;
  return <CartUI />;
};

export default Cart;
