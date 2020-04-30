import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import RedButton from 'src/components/common/buttons/RedButton';
import log from 'src/util/log';
import api from 'src/util/api';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import AddressInput from './AddressInput';

const Container = styled.div`
  // width 100%;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    min-width: 500px;
  }
`;

const InputCont = styled.div`
  margin: .5rem;
  background: inherit;
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
  const firstThree = ['010', '011', '016', '017', '018', '019'];
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
        .min(10, '최소 10자')
        .max(11, '최대 11자')
        .matches(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g, '형식이 틀립니다')
        .test('firstThree', 
        '첫 3자는 010, 011,016, 017, 018, 019 중에 하나이여야 됩니다', 
        v => v && firstThree.includes(v.substring(0, 3)))
        .required('필수'),
    }),
    onSubmit: (option) => {
      api.put(`/user/${user._id}/delivery-info/add`, { option })
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
          <OutlinedInput
            name="recipient"
            label="받는분"
            formik={formik}
          />
        </InputCont>
        <InputCont>
          <AddressInput
            formik={formik}
          />
        </InputCont>
        <InputCont>
          <OutlinedInput
            name="addressDetail"
            label="주소상세"
            formik={formik}
          />
        </InputCont>
        <InputCont>
          <OutlinedInput
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
