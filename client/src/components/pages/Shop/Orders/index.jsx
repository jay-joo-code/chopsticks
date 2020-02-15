import React from 'react';
import { useSelector } from 'react-redux';
import Orders from './Orders';

const OrdersIndex = () => {
  const user = useSelector((state) => state.user);
  
  if (!user) return <div />;
  return (
    <Orders
      user={user}
    />
    )
};

export default OrdersIndex;
