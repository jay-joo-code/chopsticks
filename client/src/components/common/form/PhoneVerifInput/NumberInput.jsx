import React, { useEffect } from 'react';
import styled from 'styled-components';
import generator from 'generate-password';
import { sendAlertOnEvent } from 'src/util/bizm';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import OutlinedButton from 'src/components/common/buttons/OutlinedButton';
import Loading from 'src/components/common/displays/Loading';
import log from 'src/util/log';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`

`;

const Btn = styled(OutlinedButton)`
  flex-grow: 2;
`

const Success = styled(Body)`
  color: ${props => props.theme.primary};
  margin-top: .2rem;
`

const NumberInput = ({ formik, name, verifName, setCode, codeSent, setCodeSent }) => {
  const sendCode = async () => {
    try {
      if (!formik.touched[name] || formik.errors[name]) return;
      
      // set verif code
      var newCode = generator.generate({
          length: 4,
          numbers: true,
          uppercase: false,
          lowercase: false
      });
      setCode(newCode);
      
      // send alert
      const number = formik.values[name];
      sendAlertOnEvent(number, 'MOBILE_AUTH', { code: newCode });
      setCodeSent(true);
    } catch (e) {
      log(`ERROR NumberInput`, e);
    }
  }
  
  const btn = <Btn 
      onClick={sendCode}
      type='button'
    >
      인증
    </Btn>
  const authBtn = codeSent ? <Loading /> : btn;
  
  return (
    <Container>
      <OutlinedInput
        formik={formik}
        name={name}
        placeholder='전화번호'
        sideButton={formik.values[verifName] ? null : authBtn}
      />
      {formik.values[verifName] && <Success muted>인증완료</Success>}
    </Container>
  )
};

export default NumberInput;
