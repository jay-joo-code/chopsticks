import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import CartUI from './CartUI';
import CartEmpty from './CartEmpty';
import useRouter from 'src/util/hooks/useRouter';

const Cart = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) fetchSelfAndStore(user._id);
  }, []);

  if (!user || !user.cart) {
    history.push('/login');
    return <div />;
  }
  if (!user.cart.length) { 
    if (!router.query.checkout) return <CartEmpty />;
    else return <div />;
  }
  return <CartUI />;
};

export default Cart;
