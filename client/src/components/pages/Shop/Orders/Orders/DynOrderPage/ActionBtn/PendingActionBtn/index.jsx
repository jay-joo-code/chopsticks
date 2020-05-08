import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import api from 'src/util/api';
import log from 'src/util/log';
import { sendAlertOnEvent } from 'src/util/bizm';
import { validateDeliv } from './../../actions';
import { useDispatch } from 'react-redux';
import Loading from 'src/components/common/displays/Loading';

const Container = styled.div`

`;

const PendingActionBtn = ({ order, v, setV }) => {
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  const handleClick =  async (e) => {
    try {
      e.stopPropagation();
      setLoading(true);

      // validation
      const { msg, isValid } = await validateDeliv(order);
      if (!isValid) {
        dispatch({
          type: 'ALERT_SET',
          payload: {
            show: true,
            msg,
            color: 'danger'
          }
        })
        setLoading(false);
        return;
      }

      // update order and reload
      const updateData = {
        state: 'delivering',
        deliv: {
          ...order.deliv,
        }
      }
      await api.put(`/order/${order._id}/update`, updateData)
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
      setLoading(false);
    } catch (e) {
      log(`ERROR PendingActionBtn`, e)
    }
  } 
  
  return (
    <Container>
      {loading 
        ? <Loading />
        : (
          <Btn
            onClick={handleClick}
          >
            발송완료
          </Btn>
        )
      }
    </Container>
  )
};

export default PendingActionBtn;
