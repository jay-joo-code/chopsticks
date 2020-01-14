import React, { useState } from 'react';
import styled from 'styled-components';
import Btn from './Btn';
import Popup from './Popup';

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

const PopupButton = ({ popupContent, btnText }) => {
  const [showBtn, setShowBtn] = useState(false);
  const handleClick = () => setShowBtn(!showBtn);
  
  return (
    <Container>
      <Btn
        onClick={handleClick} 
      >
        {btnText}
      </Btn>
      {showBtn && <Popup content={popupContent} />}
    </Container>
  )
};

export default PopupButton;
