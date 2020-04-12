import React from 'react';
import styled from 'styled-components';
import { setOrderState } from 'src/util/helpers';
import Badge from 'src/components/common/displays/Badge';
import { cancelOrder } from './../../actions/cancel';
import log from 'src/util/log';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > * {
    margin: .2rem 0;
  }
`;

const CancelActionBtn = ({ order, v, setV}) => {
  const updateState = async (e, newState) => {
    try {
      e.stopPropagation();
      if (newState === 'cancelRejected') {
        await setOrderState(order._id, newState);
      }
      else if (newState === 'canceled') {
        await cancelOrder(order);
      }
      setV(v + 1);
    }
    catch (e) {
      log('ERROR CancelActionBtn', e);
    }
  }
  return (
    <div>
      {order.state === 'cancelRequested' && (
        <Container>
          <Badge
            size='sm'
            borderRadius='none'
            color='primary'
            inverted
            onClick={(e) => updateState(e, 'canceled')}
          >
            취소완료
          </Badge>
          <Badge
            size='sm'
            borderRadius='none'
            color='primary'
            inverted
            onClick={(e) => updateState(e, 'cancelRejected')}
          >
            취소거부
          </Badge>
        </Container>
      )}
      {order.state === 'canceled' && '취소완료'}
      {order.state === 'cancelRejected' && '취소거부'}
    </div>
  )
};

export default CancelActionBtn;
