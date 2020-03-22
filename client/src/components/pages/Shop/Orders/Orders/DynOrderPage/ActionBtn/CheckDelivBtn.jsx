import React from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import axios from 'axios';
import log from 'src/util/log';
import trackerUrl from 'src/util/path/trackerUrl';

const Container = styled.div`

`;

const CheckDelivBtn = ({ order, delivData, setDelivData, setShowDelivPopup }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    
    axios.get(trackerUrl(order))
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
