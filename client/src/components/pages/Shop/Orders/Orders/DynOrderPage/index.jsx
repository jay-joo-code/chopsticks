import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from 'src/util/api';
import log from 'src/util/log';
import ToolBar from './ToolBar';
import OrdersList from './OrdersList';

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DynOrderPageIndex = ({ user, state }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState([]);
  const [v, setV] = useState(0);

  // fetch all orders
  useEffect(() => {
    if (user && state) {
      api.get(`/order/seller/${user._id}`)
        .then((res) => {
          setAllOrders(res.data);
        })
        .catch((e) => log('ERROR fetching orders at DynOrderPageIndex', e));
    }
  }, [user, v]);

  // filter orders by state
  useEffect(() => {
    setOrders(allOrders.filter((order) => order.state.includes(state)))
  }, [allOrders, state])

  return (
    <Container>
      <SectionContainer>
        <ToolBar
          selected={selected}
          setSelected={setSelected}
          orders={orders}
          state={state}
          v={v}
          setV={setV}
        />
        <OrdersList
          orders={orders}
          setOrders={setOrders}
          selected={selected}
          setSelected={setSelected}
          v={v}
          setV={setV}
        />
      </SectionContainer>
    </Container>
  );
};

export default DynOrderPageIndex;
