import React from 'react';
import api from 'src/util/api';
import log from 'src/util/api';
import UICustom from './UICustom';
import Btn from 'src/components/common/buttons/Btn';
import styled from 'styled-components';

const SBtn = styled(Btn)`
  opacity: ${props => props.seen ? '.5' : ''};
`

const OrderListCardIndex = ({ order, colWidths, v, setV, selected, setSelected }) => {
  // text formatting
  const { image, images, primaryImageIndex, name, options, optionsTwo } = order.cartObj.item;
  const imgSrc = image || images[primaryImageIndex];
  const idx = order.cartObj.optionsIndex;
  let opts = `${(options[idx[0]] || '')} ${(optionsTwo[idx[1]] || '')}`.trim() || '없음';
  const orderDesc = `수량 ${order.cartObj.quantity}, 옵션 ${opts}`;
  const date = new Date(order.createdAt).toLocaleDateString('ko-KR');
  
  // btn click handlers
  const setSeen = async (e) => {
    e.stopPropagation();
    try {
        if (order.state === 'cancelPending') {
          await api.post(`/order/${order._id}/cancel`)
        }
        await api.put(`/order/${order._id}/update`, { seen: true })  
        setV(v + 1)
      } catch (e) {
        log(`ERROR seenSelected`, e)
      }
  }
  const updateState = (e) => {
    e.stopPropagation();
    let state = order.state === 'pending' ? 'delivering' : 'complete';
    api.put(`/order/${order._id}/update`, { state, seen: false })
      .then(() => setV(v + 1))
      .catch((e) => log(`ERROR OrderListCardIndex updateState`, e))
  }
  
  // conditional btn rendering 
  let seen = order.seen ? 1 : 0;
  if (order.state === 'cancelPending') seen = 0;
  const seenBtn = (
    <SBtn 
      type='button'
      color='primary'
      seen={seen}
      onClick={setSeen}
    >확인</SBtn>
    )
  const condBtnText = {
    'pending': '발송완료',
    'delivering': '배송완료'
  }
  const stateChangeBtn = (
    <Btn
      type='button'
      color='primary'
      onClick={updateState}
    >{condBtnText[order.state]}</Btn>
    )
  
  const isPending = order.state === 'pending' && order.seen;
  const isDelivering = order.state === 'delivering';
  const showStateChangeBtn = (isPending || isDelivering);
  const btn = showStateChangeBtn ? stateChangeBtn : seenBtn;
  
  // handle delete
  const handleCancel = () => {
    api.post(`/order/${order.bootpay.receipt_id}/cancel`)
      .then(() => setV(v + 1))
      .catch((e) => log(`ERROR OrderListCardIndex handleCancel`, e))
  }
  
  if (!order) return <div />;
  
  return (
    <UICustom
      order={order}
      colWidths={colWidths}
      imgSrc={imgSrc}
      name={name}
      orderDesc={orderDesc}
      date={date}
      btn={btn}
      handleCancel={handleCancel}
      selected={selected}
      setSelected={setSelected}
      btn={btn}
    />
    )
};

export default OrderListCardIndex;
