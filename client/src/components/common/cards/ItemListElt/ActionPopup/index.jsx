import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Popup from 'src/components/common/popups/Popup';
import api from 'src/util/api';
import log from 'src/util/log';
import OutlinedTextarea from 'src/components/common/form/OutlinedTextarea';
import Btn from 'src/components/common/buttons/Btn';
import Body from 'src/components/common/fonts/Body';
import ErrMsg from 'src/components/common/fonts/ErrMsg';
import { sendAlertOnEvent } from 'src/util/bizm';
import { cartObjToOptsString } from 'src/util/helpers';
import OrderData from './OrderData';
import { setOrderState } from 'src/util/helpers';


const Container = styled.div`
  background: rgba(0, 0, 0, .05);
`;

const PopupContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    min-width: 400px;
  }
`;

const GuidelinesSection = styled.div`
  margin: 1rem 0 0;
`

const BtnSection = styled.div`
  display: flex;
  margin-top: 2rem;
  
  & > button {
    margin: 0 .4rem;
  }
`

const ActionPopup = ({
  order, show, setShow, action, rid, setV, v,
}) => {
  // state
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState();
  
  const closePopup = () => {
    setShow(false);
    setMsg('')
    setErr(null);
  };
  
  const handleAction = async () => {
    try {
    closePopup();
    
    // update db with new state
    const actionToNewState = {
      '취소문의': 'cancelRequested',
      '교환문의': 'exchangeRequested',
      '환불문의': 'refundRequested'  
    }
    const newState = actionToNewState[action];
    
    if (newState === 'exchangeRequested') {
      const exchangeOrderData = {
        ...order,
        _id: undefined,
        linkedOrderId: order._id,
        state: 'exchangeRequested'
      }
      await api.post(`/order/create`, exchangeOrderData);
    }
    else {
      await setOrderState(order._id, newState, msg); 
    }
    setV(v + 1);
    
    // send alert
    const number = order.seller.mobile;
    const { cartObj, buyer } = order;
    const data = {
      itemName: cartObj.item.name,
      optsString: cartObjToOptsString(cartObj),
      qty: cartObj.quantity,
      buyerName: buyer.name,
      newState: action.slice(0, 2),
      url: 'https://chopsticks.market/shop/admin/orders'
    }
    
    sendAlertOnEvent(number, 'ORDER_STATE_CHANGE', data);
    }
    catch (e) {
      log('ERROR ActionPopup', e)
    }
  };

  return (
    <Container>
      <Popup
        display={show}
        handleClosePopup={closePopup}
        title={action && action.slice(0, 2) + '신청'}
      >
        <PopupContent>
          <OrderData order={order} />
          <OutlinedTextarea
            value={msg}
            setValue={setMsg}
            label={action && action.slice(0, 2) + '사유'}
            placeholder='자세한 사유를 입력해주세요'
          />
          {(action === '교환문의' || action === '환불문의') && (
            <GuidelinesSection>
              <Body muted>- 교환/환불 전 디자이너/작가님에게 문의를 해보세요.</Body>
              <Body muted>- 타당하지 않은 사유는 신청이 거부될 수도 있습니다</Body>
              <Body muted>- 작성하신 사유에 의해 책임 여부가 결정되며, 이에 따른 추가 배송비가 발생 할 수 있습니다.</Body>
            </GuidelinesSection>
          )}
          <BtnSection>
            <Btn
              inverted
              onClick={closePopup}
            >취소
            </Btn>
            <Btn
              color="primary"
              onClick={handleAction}
            >신청
            </Btn>
          </BtnSection>
          {err && <ErrMsg>{err}</ErrMsg>}
        </PopupContent>
      </Popup>
    </Container>
  );
};

export default ActionPopup;
