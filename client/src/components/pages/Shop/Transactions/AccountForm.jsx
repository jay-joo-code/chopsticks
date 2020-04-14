import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import Alert from 'src/components/common/displays/Alert';
import api from 'src/util/api';
import log from 'src/util/log';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import Btn from 'src/components/common/buttons/Btn';

const Form = styled.form`

`;

const Input = styled(OutlinedInput)`
  margin-bottom: .5rem;
`

const BtnSection = styled.div`
  display: flex;
  justify-content: center;
`

const AccountForm = ({ user }) => {
  const { owner, bank, number } = user.shop.account || {};
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  
  const formik = useFormik({
    initialValues: {
      owner: owner || '',
      bank: bank || '',
      number: number || '',
    },
    validationSchema: Yup.object({
      owner: Yup.string()
        .required('Required'),
      bank: Yup.string()
        .required('Required'),
      number: Yup.string()
        .required('Required'),
    }),
    onSubmit: values => {
      const newShop = {
        ...user.shop,
        account: {
          ...values
        }
      }
      const newUser = {
        ...user,
        shop: newShop
      }
      
      api.put(`/user/${user._id}/update`, newUser)
        .then((res) => {
          fetchSelfAndStore(user._id);
          setMsg('저장되었습니다')
          setShow(true);
        })
        .catch((e) => {
          log('ERROR AccountForm', e);
        })
    },
  });
  
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        formik={formik}
        label='이름'
        name='owner'
      />
      <Input
        formik={formik}
        label='은행'
        name='bank'
      />
      <Input
        formik={formik}
        label='계좌번호'
        name='number'
      />
      <BtnSection>
        <Btn type="submit" color='danger'>저장</Btn>
      </BtnSection>
      <Alert
        show={show}
        setShow={setShow}
        msg={msg}
        color='primary'
      />
    </Form>
  );
};

export default AccountForm;
