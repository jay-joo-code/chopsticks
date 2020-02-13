import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import RedButton from 'src/components/common/buttons/RedButton';
import log from 'src/util/log';
import axios from 'axios';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';

const Container = styled.div`

`;

const StyledInput = styled(OutlinedInput)`
  background-color: rgba(0, 0, 0, .1);
`;

const InputCont = styled.div`
  margin: .5rem;
`;

const BtnCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const StyledBtn = styled(RedButton)`
  margin: 0 .2rem;
`;

const DeliveryForm = ({ setView, user }) => {
  const formik = useFormik({
    initialValues: {
      recipient: '',
      address: '',
      addressDetail: '',
      mobile: '',
    },
    validationSchema: Yup.object({
      recipient: Yup.string()
        .required('필수'),
      address: Yup.string()
        .required('필수'),
      addressDetail: Yup.string()
        .required('필수'),
      mobile: Yup.string()
        .matches(/^[0-9]{11}$/, '11자 한국 전화번호가 아닙니다')
        .required('필수'),
    }),
    onSubmit: (option) => {
      axios.put(`/api/user/${user._id}/delivery-info/add`, { option })
        .then(() => {
          fetchSelfAndStore(user._id);
          setView('list');
        })
        .catch((e) => {
          log('ERROR add delivery info', e);
        });
    },
  });

  const handleCancel = () => {
    setView('list');
  };

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <InputCont>
          <StyledInput
            name="recipient"
            label="받는분"
            formik={formik}
          />
        </InputCont>
        <InputCont>
          <StyledInput
            name="address"
            label="주소"
            formik={formik}
          />
        </InputCont>
        <InputCont>
          <StyledInput
            name="addressDetail"
            label="주소상세"
            formik={formik}
          />
        </InputCont>
        <InputCont>
          <StyledInput
            name="mobile"
            label="전화번호"
            formik={formik}
          />
        </InputCont>
        <BtnCont>
          <StyledBtn white rounded type="button" onClick={handleCancel}>취소</StyledBtn>
          <StyledBtn green rounded type="submit">추가</StyledBtn>
        </BtnCont>
      </form>
    </Container>
  );
};

export default DeliveryForm;
