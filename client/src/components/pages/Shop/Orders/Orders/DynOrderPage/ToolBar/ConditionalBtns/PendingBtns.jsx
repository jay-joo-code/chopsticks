import React, { useState } from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import log from 'src/util/log';
import { validateDeliv } from './../../actions';
import { setDelivering } from './../../actions/pending';
import Alert from 'src/components/common/displays/Alert';

const Container = styled.div`
  margin: 0 .5rem;
`;

const PendingBtns = ({ selected, setSelected, v, setV }) => {
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false);
  
  const handleClick = async () => {
    try {
      // validation
      const validationPromises = selected.map((id) => validateDeliv(id, 'byId'));
      const validationRes = await Promise.all(validationPromises);
      const failedValidations = validationRes.filter((res) => {
        return !res.isValid
      })
      
      if (failedValidations.length > 0) {
        // failed validation
        setMsg(failedValidations[0].msg);
        setShow(true);
        return;
      }
      
      // change state to delivering
      const stateChangePromises = selected.map((id) => setDelivering(id, 'byId'));
      Promise.all(stateChangePromises);
    }
    catch (e) {
      log('ERROR PendingBtns', e);
    }
  }
  
  return (
    <Container>
      <Btn
        onClick={handleClick}
      >발송완료
      </Btn>
      <Alert
        show={show}
        setShow={setShow}
        msg={msg}
        color='danger'
      />
    </Container>
  )
};

export default PendingBtns;
