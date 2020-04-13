import React from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import { setOrderState } from 'src/util/helpers';
import log from 'src/util/log';
import { validateDeliv } from './../../actions';

const Container = styled.div`
  margin: 0 .5rem;
`;

const PendingBtns = ({ selected, setSelected, v, setV }) => {
  const handleClick = () => {
    const promiseArray = selected.map((id) => validateDeliv(id, 'byId'));
    
    Promise.all(promiseArray)
      .then((res) => {
        console.log(res)
        setV(v + 1);
        setSelected([]);
      })
      .catch((e) => {
        log('ERROR PendingBtns', e);
      })
  }
  
  return (
    <Container>
      <Btn
        onClick={handleClick}
      >발송완료
      </Btn>
    </Container>
  )
};

export default PendingBtns;
