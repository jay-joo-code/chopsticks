import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ErrMsgFont from 'src/components/common/fonts/ErrMsg';

const Container = styled.div`
  font-size: .8rem;
  color: #de6362;
  margin-top: .5rem;
`;

const ErrMsg = ({ formik, name, children, ...rest }) => {
  const [err, setErr] = useState();
  useEffect(() => {
    if (formik.touched[name] && formik.errors[name]) {
      setErr(formik.errors[name])
    } else {
      setErr('')
    }
  }, [formik])
  
  if (!formik) return (
      <ErrMsgFont {...rest}>
        {children}
      </ErrMsgFont>
    )
  
  return (
    <Container {...rest}>
      <ErrMsgFont>{err}</ErrMsgFont>
    </Container>
  )
};

export default ErrMsg;
