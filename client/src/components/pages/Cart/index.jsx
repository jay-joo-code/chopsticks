import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CartUI from './CartUI';
import CartEmpty from './CartEmpty';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';

const Cart = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user) fetchSelfAndStore(user._id);
  }, [])
  
  if (!user) {
    history.push('/login');
    return <div />;
  }
  else if (!user.cart.length) return <CartEmpty />;
  return <CartUI />;
};

export default Cart;
