import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import SexInput from './SexInput';
import BdayInput from './BdayInput';
import ImageInput from 'src/components/common/form/ImageInput';
import Btn from 'src/components/common/buttons/Btn';
import api from 'src/util/api';
import log from 'src/util/log';
import Alert from 'src/components/common/displays/Alert';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import ErrMsg from 'src/components/common/fonts/ErrMsg';

const FormComponent = styled.form`
  width: 100%;
  background: white;
  padding: 2rem;
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

const Form = ({ user }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState('')
  const formik = useFormik({
    initialValues: {
      email: user.email,
      password: '',
      newPwd: '',
      newPwdConfirm: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('필수'),
      password: Yup.string()
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
      
      api.put(`/user/${user._id}/update/pwd`, values)
        .then((res) => {
          setShowAlert(true);
          fetchSelfAndStore(user._id);
        })
        .catch((e) => log(`ERROR user profile form update`, e))
    },
  });
  return (
    <FormComponent onSubmit={formik.handleSubmit}>
      <Input
        formik={formik}
        name='password'
        label='비밀번호'
        type='password'
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
  )
};

export default Form;
