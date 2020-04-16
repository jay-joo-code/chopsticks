import React, { useState } from 'react';
import styled from 'styled-components';
import Alert from 'src/components/common/displays/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import ImageInput from 'src/components/common/form/ImageInput';
import Btn from 'src/components/common/buttons/Btn';
import api from 'src/util/api';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import log from 'src/util/log';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

const CompanyInfoForm = ({ user }) => {
  const { shop } = user;
  const [hasError, setHasError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      certification: shop.certification || '',
      reportNumber: shop.reportNumber || ''
    },
    validationSchema: Yup.object({
      certification: Yup.string(),
      reportNumber: Yup.string()
    }),
    onSubmit: (values) => {
      const updatedShop = { ...user.shop, ...values };
      const updatedUser = { ...user, shop: updatedShop };
      api.put(`/user/${user._id}/update`, updatedUser)
        .then(() => {
          fetchSelfAndStore(user._id);
          setHasError(false);
          setShowAlert(true);
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
          name="certification"
          label="사업자 등록증"
          square
        />
      </InputContainer>
      <InputContainer>
        <OutlinedInput
          formik={formik}
          name="reportNumber"
          label="통신판매업 신고번호"
        />
      </InputContainer>
      <Btn
        type="submit"
      >
저장
      </Btn>
      <Alert
        msg={hasError ? '입력란에 오류가 있습니다' : '저장되었습니다'}
        show={showAlert}
        setShow={setShowAlert}
        color={hasError ? 'danger' : 'primary'}
      />
    </Form>
  )
};

export default CompanyInfoForm;
