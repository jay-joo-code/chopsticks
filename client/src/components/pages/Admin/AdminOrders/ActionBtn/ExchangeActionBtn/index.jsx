import React from 'react';
import styled from 'styled-components';
import Body from 'src/components/common/fonts/Body';

import ExchangeRequestedBtn from './ExchangeRequestedBtn';
import ExchangePendingBtn from './ExchangePendingBtn';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ExchangeActionBtn = ({ order, v, setV }) => {
  if (order.state === 'exchangeRequested') {
    return <ExchangeRequestedBtn 
      order={order}
      v={v}
      setV={setV}
    />
  }
  
  if (order.state === 'exchangePending') {
    return <ExchangePendingBtn
     order={order}
     v={v}
     setV={setV}
    />
  }
  
  const stateTextMap = {
    'exchanged': '교환완료',
    'exchangeRejected': '교환거절'
  }
  const stateText = stateTextMap[order.state];
  
  return (
    <Container>
      <Body>{stateText}</Body>
    </Container>
  )
};

export default ExchangeActionBtn;
