import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Popup from 'src/components/common/popups/Popup';
import api from 'src/util/api';
import log from 'src/util/log';
import OutlinedTextarea from 'src/components/common/form/OutlinedTextarea';
import Btn from 'src/components/common/buttons/Btn';
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

const BtnSection = styled.div`
  display: flex;
  
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
  };
  
  const handleAction = () => {
    closePopup();
    
    // update db with new state
    const actionToNewState = {
      '취소문의': 'cancelRequested',
      '교환문의': 'exchangeRequested',
      '환불문의': 'refundRequested'  
    }
    api.post(`/order/${order._id}/state-change/${actionToNewState[action]}`, { stateMsg: msg })
      .then((res) => setV(v + 1))
      .catch((e) => log('ERROR ActionSection handleOrderStateChange', e));
    
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
  };
  
  const actionToTitle = {
    '취소문의': '취소신청',
    '교환문의': '교환신청',
    '환불문의': '환불신청'
  }

  return (
    <Container>
      <Popup
        display={show}
        handleClosePopup={closePopup}
        title={actionToTitle[action]}
      >
        <PopupContent>
          <OutlinedTextarea
            value={msg}
            setValue={setMsg}
          />
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
