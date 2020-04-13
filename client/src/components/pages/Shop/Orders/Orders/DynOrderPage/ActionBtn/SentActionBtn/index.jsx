import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import api from 'src/util/api';
import log from 'src/util/log';
import axios from 'axios';
import Alert from 'src/components/common/displays/Alert';
import { sendAlertOnEvent } from 'src/util/bizm';
import trackerUrl from 'src/util/path/trackerUrl';

const Container = styled.div`

`;

const SentActionBtn = ({ order, v, setV }) => {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  
  const setDelivering = async () => {
    try {
      await api.put(`/order/${order._id}/update`, { state: 'delivering' })
      setV(v + 1);
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
      log(`ERROR SentActionBtn`, e)
    }
  }
  
  // validation
  const { company, companyCode, invoice } = order.deliv;
  const noDelivData = !company || !companyCode || !invoice;
  const [invalidDelivData, setInvalidDelivData] = useState(true);
  useEffect(() => {
    axios.get(trackerUrl(order))
      .then((res) => {
        if (res.data.result === 'Y') {
          setInvalidDelivData(false);
        }
        else {
          setInvalidDelivData(true);
        }
      })
      .catch((e) => log(`ERROR CheckDelivBtn`, e))
  }, [order])
  
  const handleClick = (e) => {
    e.stopPropagation();

    if (noDelivData) {
      setMsg('택배사 / 송장번호를 입력해주세요')
      setShow(true);
      return;
    };
    
    if (invalidDelivData) {
      setMsg('운송장이 아직 등록되지 않았거나 잘못된 운송장번호입니다.')
      setShow(true)
    }
    
    setDelivering();
  }
  
  log(noDelivData, invalidDelivData, order.deliv);
  
  return (
    <Container>
      <Btn
        onClick={handleClick}
        disabled={noDelivData || invalidDelivData}
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

export default SentActionBtn;
