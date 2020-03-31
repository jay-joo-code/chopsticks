import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OutlinedTextarea from 'src/components/common/form/OutlinedTextarea';
import Btn from 'src/components/common/buttons/Btn';
import api from 'src/util/api';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import log from 'src/util/log';
import Alert from 'src/components/common/displays/Alert';
import { initDelivery, initRefund } from 'src/constants';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  
  @media (min-width: ${(props) => props.theme.desktopContentWidth}px) {
    width: 50%;
  }
`;

const PoliciesForm = ({ user }) => {
  const { delivery, refund, etc } = user.shop.policies || {};
  const formik = useFormik({
    initialValues: {
      delivery: delivery || initDelivery,
      refund: refund || initRefund,
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
    onSubmit: (values) => {
      const updatedShop = { ...user.shop, policies: values };
      const updatedUser = { ...user, shop: updatedShop };
      api.put(`/user/${user._id}/update`, updatedUser)
        .then((res) => {
          fetchSelfAndStore(user._id);
          setShowAlert(true);
        })
        .catch((e) => log('ERROR update shop policies'));
    },
  });

  // alert after success
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputContainer>
        <OutlinedTextarea
          formik={formik}
          name="delivery"
          label="제작 / 배송"
          height={400}
        />
      </InputContainer>
      <InputContainer>
        <OutlinedTextarea
          formik={formik}
          name="refund"
          label="환불 / 교환"
          height={400}
        />
      </InputContainer>
      <InputContainer>
        <OutlinedTextarea
          formik={formik}
          name="etc"
          label="추가 정보"
          height={400}
        />
      </InputContainer>
      <Btn
        type="submit"
      >
저장
      </Btn>
      <Alert
        show={showAlert}
        setShow={setShowAlert}
        msg="저장되었습니다"
      />
    </Form>
  );
};

export default PoliciesForm;
