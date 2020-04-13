import React from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import { setOrderState } from 'src/util/helpers';
import log from 'src/util/log';

const Container = styled.div`
  margin: 0 .5rem;
`;

const NewBtns = ({ selected, setSelected, v, setV }) => {
  const handleClick = () => {
    const promiseArray = selected.map((id) => setOrderState(id, 'pending'));
    
    Promise.all(promiseArray)
      .then(() => {
        setV(v + 1);
        setSelected([]);
      })
      .catch((e) => {
        log('ERROR NewBtns', e);
      })
  }
  
  return (
    <Container>
      <Btn
        onClick={handleClick}
      >확인
      </Btn>
    </Container>
  )
};

export default NewBtns;
