import React from 'react';
import styled from 'styled-components';
import Badge from 'src/components/common/displays/Badge';
import { setOrderState } from 'src/util/helpers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > * {
    margin: .2rem 0;
  }
`;

const ExchangeRequestedBtn = ({ order, v, setV}) => {
  // order state: exchangeRequested
  
  const toExchangePending = async (e) => {
    try {
      e.stopPropagation();
      await setOrderState(order._id, 'exchangePending');
      setV(v + 1);
    } 
    catch (error) {
      
    }
  }
  
  const toExchangeRejected = async (e) => {
    try {
      e.stopPropagation();
      await setOrderState(order._id, 'exchangeRejected');
      setV(v + 1);
    } 
    catch (error) {
      
    }
  }
  
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
