import React from 'react';
import styled from 'styled-components';
import api from 'src/util/api';
import log from 'src/util/log';
import Btn from 'src/components/common/buttons/Btn';

import ExchangeActionBtn from './ExchangeActionBtn';
import SentBtn from './SentBtn';
import CheckDelivBtn from './CheckDelivBtn';

const SBtn = styled(Btn)`
  opacity: ${(props) => (props.seen ? '.5' : '')};
`;

const ActionBtn = ({ order, v, setV, selectedOrders, state, delivData, setDelivData, setShowDelivPopup }) => {
  if (order.state === 'exchangePending' || order.state === 'exchanged') {
    return (
      <ExchangeActionBtn
        order={order}
        v={v}
        setV={setV}
      />
      )
  }
  
  if (order.state === 'pending' && order.seen) {
    return (
      <SentBtn
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
  
  // handle click
  const handleClick = (e) => {
    e.stopPropagation();
    const isPending = order.state === 'pending' && order.seen;
    const isDelivering = order.state === 'delivering';
    const showStateChangeBtn = (isPending || isDelivering);
    
    if (selectedOrders) {
      selectedOrders.map((order) => {
        if (showStateChangeBtn) updateState(order);
        else setSeen(order);
      })
    } else {
      if (showStateChangeBtn) updateState(order);
      else setSeen(order);
    }
  };

  const setSeen = async (order) => {
    try {
      if (order.state === 'cancelPending') {
        await api.post(`/order/${order._id}/cancel`);
      } else if (order.state === 'exchangePending') {
        await api.post(`/order/${order._id}/state-change/exchanged`);
      } else if (order.state === 'refundPending') {
        await api.post(`/order/${order._id}/cancel`);
        await api.post(`/order/${order._id}/state-change/refunded`);
      }
      await api.put(`/order/${order._id}/update`, { seen: true });
      setV(v + 1);
    } catch (e) {
      log('ERROR seenSelected', e);
    }
  };
  
  const updateState = (order) => {
    const state = order.state === 'pending' ? 'delivering' : 'complete';
    
    if (order.state === 'pending' && (!order.deliv.company || !order.deliv.companyCode || !order.deliv.invoice)) {
      return;
    }
    
    api.put(`/order/${order._id}/update`, { state, seen: false })
      .then(() => setV(v + 1))
      .catch((e) => log('ERROR OrderListCardIndex updateState', e));
  };
  
  // text
  let text = '확인';
  const condBtnText = {
    pending: '발송완료',
    delivering: '배송완료',
  };
  if ((state === 'pending' && seen) || state === 'delivering') {
    text = condBtnText[state];
  }
  
  // seen
  let seen = 0;
  if (text === '확인') {
    seen = !selectedOrders && order.seen ? 1 : 0;
    const pendingStates = ['cancelPending', 'exchangePending', 'refundPending']
    if (pendingStates.includes(order.state)) seen = 0;
  }
  
  return (
    <SBtn
      type="button"
      color="primary"
      onClick={handleClick}
      seen={seen}
    >
      {text}
    </SBtn>
  );
};

export default ActionBtn;
