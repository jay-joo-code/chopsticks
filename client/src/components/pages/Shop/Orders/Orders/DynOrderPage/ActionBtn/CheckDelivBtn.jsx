import React from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import axios from 'axios';
import log from 'src/util/log';

const Container = styled.div`

`;

const CheckDelivBtn = ({ order, delivData, setDelivData, setShowDelivPopup }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    const { companyCode, invoice } = order.deliv;
    const { REACT_APP_TRACKER_BASE, REACT_APP_TRACKER_KEY } = process.env
    axios.get(`${REACT_APP_TRACKER_BASE}/trackingInfo?t_key=${REACT_APP_TRACKER_KEY}&t_code=${companyCode}&t_invoice=${invoice}`)
      .then((res) => {
        setDelivData(res.data);
        setShowDelivPopup(true);
      })
      .catch((e) => log(`ERROR CheckDelivBtn`, e))
  }
  
  return (
    <Container>
      <Btn
        onClick={handleClick}
      >
        배송조회
      </Btn>
    </Container>
  )
};

export default CheckDelivBtn;
