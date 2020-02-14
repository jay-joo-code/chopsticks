import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Transactions from './Transactions';
import api from 'src/util/api';
import log from 'src/util/log';

const TransactionsIndex = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  useEffect(() => {
    if (user) {
      api.get(`/order/seller/${user._id}?monthIndex=${monthIndex}&state=complete`)
        .then((res) => setOrders(res.data))
        .catch((e) => log(`ERROR fetch seller order data`, e))
    }
  }, [monthIndex, user])
  
  if (!user) return <div />;
  return (
    <Transactions 
      orders={orders}
      monthIndex={monthIndex}
      setMonthIndex={setMonthIndex}
    />
  )
};

export default TransactionsIndex;
