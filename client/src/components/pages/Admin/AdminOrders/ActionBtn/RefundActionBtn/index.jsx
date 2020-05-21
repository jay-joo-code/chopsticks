import React from 'react';
import styled from 'styled-components';
import { setOrderState } from 'src/util/helpers';
import Badge from 'src/components/common/displays/Badge';
import { refundOrder } from './../../actions/refund';
import log from 'src/util/log';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > * {
    margin: .2rem 0;
  }
`;

const RefundActionBtn = ({ order, v, setV}) => {
  const updateState = async (e, newState) => {
    try {
      e.stopPropagation();
      if (['refundPending', 'refundRejected'].includes(newState)) {
        await setOrderState(order._id, newState);
      }
      else if (newState === 'refunded') {
        await refundOrder(order);
      }
      setV(v + 1);
    }
    catch (e) {
      log('ERROR RefundActionBtn', e);
    }
  }
  
  return (
    <div>
      {order.state === 'refundRequested' && (
        <Container>
          <Badge
            size='sm'
            borderRadius='none'
            color='primary'
            inverted
            onClick={(e) => updateState(e, 'refundPending')}
          >
            환불확인
          </Badge>
          <Badge
            size='sm'
            borderRadius='none'
            color='primary'
            inverted
            onClick={(e) => updateState(e, 'refundRejected')}
          >
            환불거부
          </Badge>
        </Container>
      )}
      {order.state === 'refundPending' && (
        <Container>
          <Body>환불대기</Body>
          <Badge
            size='sm'
            borderRadius='none'
            color='primary'
            inverted
            onClick={(e) => updateState(e, 'refunded')}
          >
            환불 완료처리
          </Badge>
        </Container>
      )}
      {order.state === 'refunded' && '환불완료'}
      {order.state === 'refundRejected' && '환불거부'}
    </div>
  )
};

export default RefundActionBtn;
