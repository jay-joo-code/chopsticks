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

const FormComponent = styled.form`
  width: 100%;
  background: white;
  padding: 2rem;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`

const Input = styled(OutlinedInput)`
  margin: 1rem 0;
`

const Form = ({ user }) => {
  const [showAlert, setShowAlert] = useState(false);
  const formik = useFormik({
    initialValues: user,
    validationSchema: Yup.object({
      displayImage: Yup.string()
        .required('필수'),
      email: Yup.string()
        .required('필수'),
      name: Yup.string()
        .required('필수'),
      mobile: Yup.string()
        .required('필수'),
      sex: Yup.string()
        .min(3, '필수')
        .required('필수'),
      bday: Yup.object()
        .required('필수'),
    }),
    onSubmit: values => {
      api.put(`/user/${user._id}/update`, values)
        .then((res) => {
          setShowAlert(true);
          fetchSelfAndStore(user._id);
        })
        .catch((e) => log(`ERROR user profile form update`, e))
    },
  });
  return (
    <FormComponent onSubmit={formik.handleSubmit}>
      <ImageInput
        formik={formik}
        path={`/users/${user._id}`}
        name='displayImage'
        label='대표사진'
      />
      <Input
        formik={formik}
        name='email'
        label='이메일'
        disabled='disabled'
      />  
      <Input
        formik={formik}
        name='name'
        label='이름'
      /> 
      <Input
        formik={formik}
        name='mobile'
        label='전화번호'
      /> 
      <SexInput
        formik={formik}
      />
      <BdayInput
        formik={formik}
      />
      <Center>
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
