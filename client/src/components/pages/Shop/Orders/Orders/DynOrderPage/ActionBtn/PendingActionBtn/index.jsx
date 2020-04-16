import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import api from 'src/util/api';
import log from 'src/util/log';
import Alert from 'src/components/common/displays/Alert';
import { sendAlertOnEvent } from 'src/util/bizm';
import { validateDeliv } from './../../actions';

const Container = styled.div`

`;

const PendingActionBtn = ({ order, v, setV }) => {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  
  const setDelivering = async () => {
    try {
      await api.put(`/order/${order._id}/update`, { state: 'delivering' })
      setV(v + 1);
      
      // bizm alert
      const number = order.buyer.mobile
      const data = {
        itemName: order.cartObj.item.name,
        shopTitle: order.seller.shop.title,
        buyerName: order.buyer.name,
        delivCompany: order.deliv.company,
        invoice: order.deliv.invoice,
        url: 'https://chopsticks.market/profile/orders'
      }
      sendAlertOnEvent(number, 'ORDER_SENT', data);
    } catch (e) {
      log(`ERROR PendingActionBtn`, e)
    }
  }
  
  // validation
  const [isValid, setIsValid] = useState(false);
  
  useEffect(() => {
    validateDeliv(order)
      .then((res) => {
        setMsg(res.msg);
        setIsValid(res.isValid);
      })
      .catch((e) => {
        log('ERROR PendingActionBtn', e);
      })
  }, [order])
  
  const handleClick = (e) => {
    e.stopPropagation();

    if (!isValid) {
      setShow(true);
      return;
    };
    
    setDelivering();
  }
  
  return (
    <Container>
      <Btn
        onClick={handleClick}
      >
        발송완료
      </Btn>
      <Alert
        color='danger'
        show={show}
        setShow={setShow}
        msg={msg}
      />
    </Container>
  )
};

export default PendingActionBtn;
