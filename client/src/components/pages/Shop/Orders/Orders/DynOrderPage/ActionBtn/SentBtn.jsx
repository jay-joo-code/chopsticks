import React, { useState } from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import api from 'src/util/api';
import log from 'src/util/log';
import axios from 'axios';
import Alert from 'src/components/common/displays/Alert';
import { sendAlert } from 'src/util/bizm';
import trackerUrl from 'src/util/path/trackerUrl';

const Container = styled.div`

`;

const SentBtn = ({ order, v, setV }) => {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('')
  
  const setDelivering = () => {
    api.put(`/order/${order._id}/update`, { state: 'delivering' })
      .then(() => {
        setV(v + 1);
        sendAlert(order.deliv.mobile);
      })
      .catch((e) => log(`ERROR SentBtn`, e))
  }
  
  const handleClick = (e) => {
    e.stopPropagation();
    const { company, companyCode, invoice } = order.deliv;
    if (!company || !companyCode || !invoice) {
      setMsg('택배사 / 송장번호를 입력해주세요')
      setShow(true);
      return;
    };
    
    // validation
    const { REACT_APP_TRACKER_BASE, REACT_APP_TRACKER_KEY } = process.env
    axios.get(trackerUrl(order))
      .then((res) => {
        if (res.data.receiverAddr) setDelivering();
        else {
          setMsg('틀린 택배사 / 송장번호 조합입니다')
          setShow(true)
        }
      })
      .catch((e) => log(`ERROR CheckDelivBtn`, e))
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

export default SentBtn;
