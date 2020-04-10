import React from 'react';
import styled from 'styled-components';
import { sendAlert } from 'src/util/bizm';
import Btn from 'src/components/common/buttons/Btn';

const Container = styled.div`

`;

const BizmTest = () => {
  const handleClick = () => {
    sendAlert();
  }
  return (
    <Container>
      <Btn onClick={handleClick}>send alert</Btn>
    </Container>
  )
};

export default BizmTest;
