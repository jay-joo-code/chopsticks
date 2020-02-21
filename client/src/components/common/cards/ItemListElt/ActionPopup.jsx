import React, { useState } from 'react';
import styled from 'styled-components';
import Popup from 'src/components/common/popups/Popup';
import api from 'src/util/api';
import log from 'src/util/log';
import OutlinedTextarea from 'src/components/common/form/OutlinedTextarea';
import Heading from 'src/components/common/fonts/Heading';
import Btn from 'src/components/common/buttons/Btn';
import Badge from 'src/components/common/displays/Badge';
import ErrMsg from 'src/components/common/fonts/ErrMsg';

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
`

const NewOrderState = styled.div`
  display: flex;
  margin: .5rem 0;
  
  & > * {
    margin: 0 .5rem;
  }
`

const ActionPopup = ({ order, show, setShow, action, rid, setV, v }) => {
  // state
  const [msg, setMsg] = useState('');
  const [newOrderState, setNewOrderState] = useState();
  const [err, setErr] = useState();
  
  // action handlers
  const handleClosePopup = () => {
    setShow(false);
  }
  const handleOrderStateChange = (newState) => {
    const dynNewState = newState || newOrderState;
    api.post(`/order/${order._id}/state-change/${dynNewState}`, { stateMsg: msg })
      .then((res) => setV(v + 1))
      .catch((e) => log(`ERROR ActionSection handleOrderStateChange`, e))
  }
  const handleReview = () => {
    
  }
  const handleAction = () => {
    // reset popup
    setErr('')
    setShow(false);
    setMsg('')
    
    // function call depending on action
    if (action === '환불/교환 문의') {
      if (newOrderState === 'refundPending' || newOrderState === 'exchangePending') {
        handleOrderStateChange();
      }
      else setErr('환불, 교환 둘중 하나를 골라주세요')
    }
    else if (action === '취소문의') {
      handleOrderStateChange('cancelPending');
    }
  }
  
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
                color='primary'
                type='button'
                onClick={() => setNewOrderState('refundPending')}
                inverted={newOrderState === 'refundPending'}
              >환불</Badge>
              <Badge
                type='button'
                color='primary'
                onClick={() => setNewOrderState('exchangePending')}
                inverted={newOrderState === 'exchangePending'}
              >교환</Badge>
            </NewOrderState>
          )}
          <OutlinedTextarea
            value={msg}
            setValue={setMsg}
          />
          <Btn
            color='primary'
            inverted
            onClick={handleAction}
          >저장</Btn>
          {err && <ErrMsg>{err}</ErrMsg>}
        </PopupContent>
      </Popup>
    </Container>
  )
};

export default ActionPopup;
