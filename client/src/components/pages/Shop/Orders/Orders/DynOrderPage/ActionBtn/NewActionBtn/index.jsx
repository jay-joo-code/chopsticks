import React from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import { setOrderState } from 'src/util/helpers';
import log from 'src/util/log';

const Container = styled.div`

`;

const NewActionBtn = ({ order, v, setV }) => {
  const handleClick = async (e) => {
    try {
      e.stopPropagation();
      setOrderState(order._id, 'pending');
      setV(v + 1);
    }
    catch (e) {
      log('ERROR NewActionBtn', e)
    }
  }
  return (
    <Container>
      <Btn
        onClick={handleClick}
      >
        확인
      </Btn>
    </Container>
  )
};

export default NewActionBtn;
