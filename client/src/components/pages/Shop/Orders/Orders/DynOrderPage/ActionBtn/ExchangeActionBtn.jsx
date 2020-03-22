import React from 'react';
import styled from 'styled-components';
import Badge from 'src/components/common/displays/Badge';
import api from 'src/util/api';
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

const ExchangeActionBtn = ({ order, v, setV }) => {
  const update = (data) => {
    api.put(`/order/${order._id}/update`, data)
      .then(() => setV(v + 1))
      .catch((e) => log(`ERROR ExchangeActionBtn`, e))
  }
  
  const handleStateBtnClick = (e) => {
    e.stopPropagation();
    
    update({ seen: !order.seen })
  }
  
  const handleActionBtnClick = (e) => {
    e.stopPropagation();
    
    if (order.seen) {
      // 교환 재배송
      // new order
      
      
    } else {
      // 교환 거부
      update({ state: 'exchangeRejected'})
    }
  }
  
  return (
    <div>
    {order && order.state === 'exchanged'
      ? (
        <Body muted>교환완료</Body>
      )
      : (
      <Container>
        {order && order.seen 
          ? (
            <Body onClick={handleStateBtnClick} muted>교환대기</Body>
          )
          : (
          <Badge
            size='sm'
            borderRadius='none'
            color='primary'
            inverted
            onClick={handleStateBtnClick}
          >
            교환확인
          </Badge>
          )
        }
        <Badge
          size='sm'
          borderRadius='none'
          color='primary'
          inverted
          onClick={handleActionBtnClick}
        >
          {order && order.seen ? '교환 재배송' : '교환거부'}
        </Badge>
      </Container> 
      )
    }
    </div>
  )
};

export default ExchangeActionBtn;
