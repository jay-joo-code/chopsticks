import React, { useState } from 'react';
import styled from 'styled-components';
import Badge from 'src/components/common/displays/Badge';
import Loading from 'src/components/common/displays/Loading';
import { setOrderState } from 'src/util/helpers';
import { useDispatch } from 'react-redux';
import api from 'src/util/api';
import log from 'src/util/log';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > * {
    margin: .2rem 0;
  }
`;

const ExchangeRequestedBtn = ({ order, v, setV}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  const toExchangePending = async (e) => {
    try {
      e.stopPropagation();
      setLoading(true);
      const data = {
        state: 'exchangePending',
        deliv: {
          ...order.deliv,
          company: '',
          companyCode: '',
          invoice: '',
        }
      }
      await api.put(`/order/${order._id}/update`, data);
      setV(v + 1);
      setLoading(false);
    } 
    catch (error) {
      setLoading(false);
      dispatch({
        type: 'ALERT_SET',
        payload: {
          show: true,
          color: 'danger',
          msg: '요류가 있었습니다. 페이지 새로고침 후 다시시도 해주십시오',
        }
      })
    }
  }
  
  const toExchangeRejected = async (e) => {
    try {
      e.stopPropagation();
      setLoading(true);
      await setOrderState(order._id, 'exchangeRejected');
      setV(v + 1);
      setLoading(false);
    } 
    catch (error) {
      setLoading(false);
      dispatch({
        type: 'ALERT_SET',
        payload: {
          show: true,
          color: 'danger',
          msg: '요류가 있었습니다. 페이지 새로고침 후 다시시도 해주십시오',
        }
      })
    }
  }

  if (loading) return <Loading />;
  
  return (
    <Container>
      <Badge
        size='sm'
        borderRadius='none'
        color='primary'
        inverted
        onClick={toExchangePending}
      >
        교환확인
      </Badge>
      <Badge
        size='sm'
        borderRadius='none'
        color='primary'
        inverted
        onClick={toExchangeRejected}
      >
        교환거부
      </Badge>
    </Container> 
  )
};

export default ExchangeRequestedBtn;
