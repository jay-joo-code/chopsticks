import React, { useState, useEffect } from 'react';
import log from 'src/util/log';
import api from 'src/util/api';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import Btn from 'src/components/common/buttons/Btn';
import Alert from 'src/components/common/displays/Alert';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import ErrMsg from 'src/components/common/fonts/ErrMsg';

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const FormComponent = styled.form`
  width: 100%;
  background: white;
  margin: 2rem 0;

  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    max-width: 300px;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > * {
    margin: .5rem 0;
  }
`

const Input = styled(OutlinedInput)`
  margin: 1rem 0;
`

const AdminPWReset = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState('')
  const formik = useFormik({
    initialValues: {
      email: '',
      newPwd: '',
      newPwdConfirm: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('필수'),
      newPwd: Yup.string()
        .required('필수'),
      newPwdConfirm: Yup.string()
        .required('필수'),
    }),
    onSubmit: values => {
      if (values.newPwd !== values.newPwdConfirm) {
        setErr('비밀번호가 일치하지 않습니다')
        return;
      } else {
        setErr('')
      }
      
      api.put(`/user/${values.email}/update-by-email/pwd`, values)
        .then((res) => {
          setShowAlert(true);
        })
        .catch((e) => log(`ERROR user profile form update`, e))
    },
  });
  return (
    <Container>
      <FormComponent onSubmit={formik.handleSubmit}>
        <Input
          formik={formik}
          name='email'
          label='이메일'
        />  
        <Input
          formik={formik}
          name='newPwd'
          label='새 비밀번호'
          type='password'
        /> 
        <Input
          formik={formik}
          name='newPwdConfirm'
          label='새 비밀번호 확인'
          type='password'
        />
        <Center>
          <ErrMsg>{err}</ErrMsg>
          <Btn
            color='primary'
            type='submit'
          >저장</Btn>
        </Center>
        <Alert
          show={showAlert}
          setShow={setShowAlert}
          msg='저장되었습니다'
        />
      </FormComponent>
    </Container>
  )
};

export default AdminPWReset;
