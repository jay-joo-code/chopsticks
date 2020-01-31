import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cfg from 'src/config';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Container = styled.div`

`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      axios.get(`${cfg.BASE}/order/buyer/${user._id}`)
        .then((res) => setOrders(res.data))
        .catch((e) => {})
    }
  }, [])
  return (
  <Container>
    {orders.map((order) => (
      <div>
        <p>{order.cartObj.item.name}</p>
        <p>{order.cartObj.price}</p>
      </div>
    ))
      
    }
  </Container>
  )
};

export default Orders;
