import React, { useState } from 'react';
import styled from 'styled-components';
import Badge from 'src/components/common/displays/Badge';
import Body from 'src/components/common/fonts/Body';
import log from 'src/util/log';
import { exchangeOrder } from './../../actions/exchange';
import Alert from 'src/components/common/displays/Alert';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > * {
    margin: .2rem 0;
  }
`;

const ExchangePendingBtn = ({ order, v, setV }) => {
  // order state: exchangePending
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  
  const confirmExchange = async (e) => {
    try {
      e.stopPropagation();
      const res = await exchangeOrder(order);
      
      if (!res.success) {
        setMsg(res.msg);
        setShow(true);
      }
      else {
        setV(v + 1);
      }
    }
    catch (e) {
      log('ERROR ExchangePendingBtn', e);  
    }
  }
  
  return (
    <Container>
      <Body>교환대기</Body>
      <Badge
        size='sm'
        borderRadius='none'
        color='primary'
        inverted
        onClick={confirmExchange}
      >
        교환 재배송
      </Badge>
      <Alert
        color='danger'
        show={show}
        setShow={setShow}
        msg={msg}
      />
    </Container>
  )
};

export default ExchangePendingBtn;
