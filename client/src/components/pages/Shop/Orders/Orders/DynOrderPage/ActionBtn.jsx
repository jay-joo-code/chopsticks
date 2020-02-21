import React from 'react';
import styled from 'styled-components';
import api from 'src/util/api';
import log from 'src/util/log';
import Btn from 'src/components/common/buttons/Btn';

const SBtn = styled(Btn)`
  opacity: ${(props) => (props.seen ? '.5' : '')};
`;

const ActionBtn = ({ order, v, setV }) => {
  // TODO: action handling for toolbar

  // handle click
  const handleClick = (e) => {
    e.stopPropagation();
    const isPending = order.state === 'pending' && order.seen;
    const isDelivering = order.state === 'delivering';
    const showStateChangeBtn = (isPending || isDelivering);

    if (showStateChangeBtn) updateState();
    else setSeen();
  };

  const setSeen = async () => {
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
  const updateState = () => {
    const state = order.state === 'pending' ? 'delivering' : 'complete';
    api.put(`/order/${order._id}/update`, { state, seen: false })
      .then(() => setV(v + 1))
      .catch((e) => log('ERROR OrderListCardIndex updateState', e));
  };

  // conditionally render text
  let text = '확인';
  const condBtnText = {
    pending: '발송완료',
    delivering: '배송완료',
  };
  if (order.state === 'pending' || order.state === 'delivering') {
    text = condBtnText[order.state];
  }

  let seen = order.seen ? 1 : 0;
  if (order.state === 'cancelPending') seen = 0;

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
