import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import OutlinedTextarea from 'src/components/common/form/OutlinedTextarea';
import ImageInput from 'src/components/common/form/ImageInput';
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

const BasicInfoForm = ({ user }) => {
  const { shop } = user;
  const [msg, setMsg] = useState('');
  const formik = useFormik({
    initialValues: {
      title: shop.title || '',
      intro: shop.intro || '',
      image: shop.image || '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('필수'),
      intro: Yup.string()
        .required('필수'),
      image: Yup.string()
        .required('필수'),
    }),
    onSubmit: (values) => {
      const updatedShop = { ...user.shop, ...values };
      const updatedUser = { ...user, shop: updatedShop };
      log(updatedUser);
      api.put(`/user/${user._id}/update`, updatedUser)
        .then(() => {
          fetchSelfAndStore(user._id);
          setMsg('저장 완료');
        })
        .catch((e) => log('ERROR update store basic info at form', e));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputContainer>
        <ImageInput
          formik={formik}
          path={`/users/${user._id}`}
          name="image"
          label="샵 대표사진"
        />
      </InputContainer>
      <InputContainer>
        <OutlinedInput
          formik={formik}
          name="title"
          label="샵 이름"
        />
      </InputContainer>
      <InputContainer>
        <OutlinedTextarea
          formik={formik}
          name="intro"
          label="샵 소개"
        />
      </InputContainer>
      <Btn
        type="submit"
      >
저장
      </Btn>
      {msg && msg.length > 0 && <Msg>{msg}</Msg>}
    </Form>
  );
};

export default BasicInfoForm;
