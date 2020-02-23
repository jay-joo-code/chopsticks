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

const DynOrderPageIndex = ({ user, state, seen }) => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState([]);
  const [v, setV] = useState(0);

  // reload orders on state change
  useEffect(() => {
    if (user && state) {
      const seenQuery = seen ? `&seen=${seen}` : '';
      api.get(`/order/seller/${user._id}?state=${state}${seenQuery}`)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((e) => log('ERROR fetching orders at DynOrderPageIndex', e));
    }
  }, [state, user, v, seen]);

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
