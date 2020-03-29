import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import Label from 'src/components/common/fonts/Label';
import Body from 'src/components/common/fonts/Body';
import Alert from 'src/components/common/displays/Alert';

const Container = styled.div`

`;

const PhoneVerifInput = ({ formik, name, verifName, label, autosave }) => {
  useEffect(() => {
    formik.setFieldValue(verifName, true);
  }, [])
  
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (!autosave) return;
    formik.submitForm();
  }, [formik.values[name]])
  
  return (
    <Container>
      <Label>{label}</Label>
      <Body muted>*특수문자 없이 숫자만 입력해주세요</Body>
      <OutlinedInput
        formik={formik}
        name={name}
        placeholder='전화번호'
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
