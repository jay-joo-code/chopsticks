import React, { useState } from 'react';
import styled from 'styled-components';
import Popup from 'src/components/common/popups/Popup';
import Alert from 'src/components/common/displays/Alert';

import BasicData from './BasicData';
import TrackingList from './TrackingList';

const Container = styled.div`

`;

const PopupInner = styled.div`
  width: 90vw;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    width: auto;
  }
`

const DelivPopup = ({ show, setShow, data, company }) => {
  const handleClosePopup = () => {
    setShow(false);
  }
  
  const hasError = !data || !data.receiverAddr || data.code === '105';
  
  return (
    <Container>
      <Popup
        handleClosePopup={handleClosePopup}
        display={show}
        white
      >
        <PopupInner>
          {data && <BasicData data={data} company={company} />}
          {!hasError && <TrackingList data={data} />}
        </PopupInner>
      </Popup>
    </Container>
  )
};

export default DelivPopup;
