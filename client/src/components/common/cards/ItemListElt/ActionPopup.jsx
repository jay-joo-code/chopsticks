import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Popup from 'src/components/common/popups/Popup';
import api from 'src/util/api';
import log from 'src/util/log';
import OutlinedTextarea from 'src/components/common/form/OutlinedTextarea';
import Heading from 'src/components/common/fonts/Heading';
import Btn from 'src/components/common/buttons/Btn';
import Badge from 'src/components/common/displays/Badge';
import ErrMsg from 'src/components/common/fonts/ErrMsg';
import { sendAlertOnEvent } from 'src/util/bizm';
import { cartObjToOptsString } from 'src/util/helpers';

const Container = styled.div`
  background: rgba(0, 0, 0, .05);
`;

const PopupContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > * {
    margin: 1rem 0;
  }
`;

const NewOrderState = styled.div`
  display: flex;
  margin: .5rem 0;
  
  & > * {
    margin: 0 .5rem;
  }
`;

const ActionPopup = ({
  order, show, setShow, action, rid, setV, v,
}) => {
  // state
  const [msg, setMsg] = useState('');
  const [newOrderState, setNewOrderState] = useState();
  const [err, setErr] = useState();
  
  useEffect(() => {
    if (action === '취소문의') {
      setNewOrderState('cancelRequested')
    }
  }, [action])

  const handleClosePopup = () => {
    setShow(false);
  };
  
  const handleAction = () => {
    // 교환 / 환불 selection validation
    if (action === '환불/교환 문의' && !newOrderState) {
      setErr('환불, 교환 둘중 하나를 골라주세요');
      return;
    } 
    
    // reset popup
    setErr('');
    setShow(false);
    setMsg('');
    
    // update db with new state
    api.post(`/order/${order._id}/state-change/${newOrderState}`, { stateMsg: msg })
      .then((res) => setV(v + 1))
      .catch((e) => log('ERROR ActionSection handleOrderStateChange', e));
    
    // send alert
    const number = order.seller.mobile;
    const { cartObj, buyer } = order;
    let newStateString = '';
    if (action === '취소문의') {
      newStateString = '취소'
    } 
    else if (action !== '환불/교환 문의') return;
    else {
      if (newOrderState === 'refundRequested') {
        newStateString = '환불'
      }
      else if (newOrderState === 'exchangeRequested') {
        newStateString = '교환'
      }
    }
    const data = {
      itemName: cartObj.item.name,
      optsString: cartObjToOptsString(cartObj),
      qty: cartObj.quantity,
      buyerName: buyer.name,
      newState: newStateString,
      url: 'https://chopsticks.market/shop/admin/orders'
    }
    
    sendAlertOnEvent(number, 'ORDER_STATE_CHANGE', data);
  };

  return (
    <Container>
      <Popup
        display={show}
        handleClosePopup={handleClosePopup}
      >
        <PopupContent>
          <Heading>{action}</Heading>
          {action === '환불/교환 문의' && (
            <NewOrderState>
              <Badge
                color="primary"
                type="button"
                onClick={() => setNewOrderState('refundRequested')}
                inverted={newOrderState === 'refundRequested'}
              >
환불
              </Badge>
              <Badge
                type="button"
                color="primary"
                onClick={() => setNewOrderState('exchangeRequested')}
                inverted={newOrderState === 'exchangeRequested'}
              >
교환
              </Badge>
            </NewOrderState>
          )}
          <OutlinedTextarea
            value={msg}
            setValue={setMsg}
          />
          <Btn
            color="primary"
            inverted
            onClick={handleAction}
          >
저장
          </Btn>
          {err && <ErrMsg>{err}</ErrMsg>}
        </PopupContent>
      </Popup>
    </Container>
  );
};

export default ActionPopup;
