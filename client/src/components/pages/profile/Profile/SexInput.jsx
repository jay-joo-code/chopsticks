import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ErrMsg from 'src/components/common/fonts/ErrMsg';

const Wrapper = styled.div`

`

const Container = styled.div`
  display: flex;
  align-items: center;
  
  & > * {
    margin-right: 1rem;
  }
`;

const SexInput = ({ formik }) => {
  const [sex, setSex] = useState(formik.values.sex);
  const [errMsg, setErrMsg] = useState('');
  
  useEffect(() => {
    formik.setFieldValue('sex', sex);  
  }, [sex])
  
  useEffect(() => {
    if (formik.touched.sex && formik.errors.sex) {
      setErrMsg(formik.errors.sex);
    } else {
      setErrMsg('')
    }
  }, [formik])
  
  const toggleSex = (newSex) => {
    if (sex !== newSex) setSex(newSex);
    else setSex('')
  }
  
  
  return (
    <Wrapper>
      <Container>
        <input
          type="checkbox"
          checked={sex === 'male'}
          onChange={() => toggleSex('male')}
        />
        <p>남자</p>
        <input
          type="checkbox"
          checked={sex === 'female'}
          onChange={() => toggleSex('female')}
        />
        <p>여자</p>
      </Container>
      <ErrMsg>{errMsg}</ErrMsg>
    </Wrapper>
  )
};

export default SexInput;
