import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from 'src/util/api';
import log from 'src/util/log';
import ToolBar from './ToolBar';
import OrdersList from './OrdersList';
import { updateDelivState } from 'src/util/helpers';

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
    let filteredOrders = allOrders.filter((order) => order.state.includes(state));
    setOrders(filteredOrders);
  }, [allOrders, state])

  // check if "deliving" -> "complete" updates available
  useEffect(() => {
    const checkForDelivCompletes = async () => {
      try {
        await updateDelivState(user._id, 'seller');
        setV(v + 1);
      }
      catch (e) {
        log('DynOrderpageIndex', e)
      }
    }
    checkForDelivCompletes();
  }, [])

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
