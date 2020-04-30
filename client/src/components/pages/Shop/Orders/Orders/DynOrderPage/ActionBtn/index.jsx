import React from 'react';
import styled from 'styled-components';
import api from 'src/util/api';
import log from 'src/util/log';
import Btn from 'src/components/common/buttons/Btn';

import NewActionBtn from './NewActionBtn';
import ExchangeActionBtn from './ExchangeActionBtn';
import RefundActionBtn from './RefundActionBtn';
import CancelActionBtn from './CancelActionBtn';
import PendingActionBtn from './PendingActionBtn';
import CheckDelivBtn from './CheckDelivBtn';

const SBtn = styled(Btn)`
  opacity: ${(props) => (props.seen ? '.5' : '')};
`;

const ActionBtn = ({ order, v, setV, selectedOrders, state, delivData, setDelivData, setShowDelivPopup }) => {
  // render different Action Button depending on order state
  if (order.state === 'new') {
    return (
      <NewActionBtn
        order={order}
        v={v}
        setV={setV}
      />
      )
  }
  
  if (order.state === 'pending') {
    return (
      <PendingActionBtn
        order={order}
        v={v}
        setV={setV}
      />
      )
  }
  
  if (order.state === 'delivering' || order.state === 'complete') {
    return (
      <CheckDelivBtn
        order={order}
        delivData={delivData}
        setDelivData={setDelivData}
        setShowDelivPopup={setShowDelivPopup}
      />
      )
  }
  
  if (order.state.includes('exchange')) {
    return (
      <ExchangeActionBtn
        order={order}
        v={v}
        setV={setV}
      />
      )
  }
  
  if (order.state.includes('refund')) {
    return (
      <RefundActionBtn
        order={order}
        v={v}
        setV={setV}
      />
      )
  }
  
  if (order.state.includes('cancel')) {
    return (
      <CancelActionBtn
        order={order}
        v={v}
        setV={setV}
      />
      )
  }
  return <div />;
};

export default ActionBtn;
