import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Label from 'src/components/common/fonts/Label';
import Body from 'src/components/common/fonts/Body';
import Alert from 'src/components/common/displays/Alert';

import NumberInput from './NumberInput';
import CodeInput from './CodeInput';

const Container = styled.div`

`;

const HelpingText = styled(Body)`
  margin-bottom: .2rem;
`

const PhoneVerifInput = ({ formik, name, verifName, label, autosave }) => {
  useEffect(() => {
    if (!autosave || !formik.touched[name]) return;
    formik.submitForm();
  }, [formik.values[name]])
  
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState();
  
  // autosave alerts
  const user = useSelector((state) => state.user);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (!autosave || !formik.values[verifName] || user.mobileVerif) return;
    setShowAlert(true);
  }, [formik.values[verifName]])
  
  return (
    <Container>
      <Label>{label}</Label>
      <HelpingText muted>*특수문자 없이 숫자만 입력해주세요</HelpingText>
      <NumberInput
        formik={formik}
        name={name}
        verifName={verifName}
        codeSent={codeSent}
        setCodeSent={setCodeSent}
        setCode={setCode}
      />
      <CodeInput
        formik={formik}
        name={name}
        verifName={verifName}
        code={code}
        setCode={setCode}
        codeSent={codeSent}
        setCodeSent={setCodeSent}
        autosave={autosave}
      />
      <Alert
        msg='저장되었습니다'
        show={showAlert}
        setShow={setShowAlert}
      />
    </Container>
  )
};

export default PhoneVerifInput;
