import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrdersList from './OrdersList';
import api from 'src/util/api';
import log from 'src/util/log';

const Container = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`

const MonthSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
`;

const Arrow = styled.button`
  padding: 0 .5rem;
  opacity: .6;
  background: inherit;
`;

const Month = styled.p`
  font-weight: bold;
`;

const AdminOrders = () => {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const changeMonth = (val) => {
    let newIndex = monthIndex + val;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > 11) newIndex = 11;
    setMonthIndex(newIndex);
  };

  const [v, setV] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    api.get('/order')
      .then(({ data }) => {
        console.log('data :>> ', data);
        setAllOrders(data);
        setSelected(data.map((order) => order._id))
      })
      .catch(({ response }) => log('AdminOrders', response))
  }, [v])

  useEffect(() => {
    setOrders(allOrders.filter((order) => new Date(order.createdAt).getMonth() === monthIndex).reverse())
  }, [allOrders, monthIndex])
  
  return (
    <Container>
      <MonthSection>
        <Arrow
          type="button"
          onClick={() => changeMonth(-1)}
        >
          {'<'}
        </Arrow>
        <Month>{`${monthIndex + 1}월`}</Month>
        <Arrow
          type="button"
          onClick={() => changeMonth(1)}
        >
          {'>'}
        </Arrow>
      </MonthSection>
      <OrdersList
        orders={orders}
        orders={orders}
        selected={selected}
        setSelected={setSelected}
        v={v}
        setV={setV}
      />
    </Container>
  )
};

export default AdminOrders;
