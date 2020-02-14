import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OutlinedTextarea from 'src/components/common/form/OutlinedTextarea';
import Btn from 'src/components/common/buttons/Btn';
import api from 'src/util/api';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import log from 'src/util/log';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  
  @media (min-width: ${(props) => props.theme.desktopContentWidth}px) {
    width: 40%;
  }
`;

const Msg = styled.p`
  color: ${(props) => props.theme.primary};
  font-size: .8rem;
`;

const PoliciesForm = ({ user }) => {
  const { delivery, refund, etc } = user.shop.policies || {};
  const [msg, setMsg] = useState('');
  const formik = useFormik({
    initialValues: {
      delivery: delivery || '',
      refund: refund || '',
      etc: etc || '',
    },
    validationSchema: Yup.object({
      delivery: Yup.string()
        .required('필수'),
      refund: Yup.string()
        .required('필수'),
      etc: Yup.string()
        .required('필수'),
    }),
    onSubmit: values => {
      const updatedShop = Object.assign({}, user.shop, { policies: values });
      const updatedUser = Object.assign({}, user, { shop: updatedShop });
      api.put(`/user/${user._id}/update`, updatedUser)
        .then((res) => {
          fetchSelfAndStore(user._id);
        })
        .catch((e) => log(`ERROR update shop policies`))
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputContainer>
        <OutlinedTextarea
          formik={formik}
          name="delivery"
          label="제작 / 배송"
        />
      </InputContainer>
      <InputContainer>
        <OutlinedTextarea
          formik={formik}
          name="refund"
          label="환불 / 교환"
        />
      </InputContainer>
      <InputContainer>
        <OutlinedTextarea
          formik={formik}
          name="etc"
          label="추가 정보"
        />
      </InputContainer>
      <Btn
        type="submit"
      >
저장
      </Btn>
      {msg && msg.length > 0 && <Msg>{msg}</Msg>}
    </Form>
  )
};

export default PoliciesForm;
