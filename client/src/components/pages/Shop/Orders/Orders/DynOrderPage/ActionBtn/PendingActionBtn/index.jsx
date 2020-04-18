import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import api from 'src/util/api';
import log from 'src/util/log';
import { sendAlertOnEvent } from 'src/util/bizm';
import { validateDeliv } from './../../actions';
import { useDispatch } from 'react-redux';

const Container = styled.div`

`;

const PendingActionBtn = ({ order, v, setV }) => {
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
  
  const dispatch = useDispatch();
  
  const handleClick = (e) => {
    e.stopPropagation();

    if (!isValid) {
      dispatch({
        type: 'ALERT_SET',
        payload: {
          show: true,
          msg: msg,
          color: 'danger'
        }
      })
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
    </Container>
  )
};

export default PendingActionBtn;
