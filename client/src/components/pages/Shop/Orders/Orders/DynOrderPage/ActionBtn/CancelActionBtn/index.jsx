import React, { useState } from 'react';
import styled from 'styled-components';
import { setOrderState } from 'src/util/helpers';
import Badge from 'src/components/common/displays/Badge';
import { cancelOrder } from './../../actions/cancel';
import log from 'src/util/log';
import Loading from 'src/components/common/displays/Loading';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > * {
    margin: .2rem 0;
  }
`;

const CancelActionBtn = ({ order, v, setV}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const updateState = async (e, newState) => {
    try {
      e.stopPropagation();
      setLoading(true);
      if (newState === 'cancelRejected') {
        await setOrderState(order._id, 'pending');
        dispatch({
          type: 'ALERT_SET',
          payload: {
            show: true,
            color: 'success',
            msg: '취소거절 처리 되었습니다. 주문건은 배송전으로 옮겨집니다',
          }
        })
      }
      else if (newState === 'canceled') {
        await cancelOrder(order);
      }
      setV(v + 1);
      setLoading(false);
    }
    catch (e) {
      log('ERROR CancelActionBtn', e.response);
      setLoading(false);
      dispatch({
        type: 'ALERT_SET',
        payload: {
          show: true,
          color: 'danger',
          msg: e.response.data.message,
        }
      })
    }
  }
  
  if (loading) return <Loading />;

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
