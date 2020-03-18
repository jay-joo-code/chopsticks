import React, { useState } from 'react';
import styled from 'styled-components';
import PhoneVerifInput from 'src/components/common/form/PhoneVerifInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from 'src/util/api';
import Alert from 'src/components/common/displays/Alert';
import Label from 'src/components/common/fonts/Label';
import Body from 'src/components/common/fonts/Body';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';

const Container = styled.div`
  margin: 1rem 0;
  
  & > div {
    margin: 1rem 0;
  }  
`

const Form = styled.form`

`;

const Row = styled.div`
  display: flex;
  align-items: center;
  
  & > label {
    margin: 0 .5rem 0 0;
  }
`

const UserInfo = ({ user }) => {
  // alert
  const [show, setShow] = useState(false);
  
  // form
  const firstThree = ['010', '011', '016', '017', '018', '019'];
  const formik = useFormik({
    initialValues: {
      mobile: user.mobile || '',
      mobileVerif: user.mobileVerif || false,
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .min(10, '최소 10자')
        .max(11, '최대 11자')
        .matches(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g, '형식이 틀립니다')
        .test('firstThree', 
        '첫 3자는 010, 011,016, 017, 018, 019 중에 하나이여야 됩니다', 
        v => v && firstThree.includes(v.substring(0, 3)))
        .required('필수'),
      mobileVerif: Yup.bool().oneOf([true], '휴대폰 인증은 필수입니다'),
    }),
    onSubmit: (values) => {
      api.put(`/user/${user._id}/update`, values)
        .then(() => {
          setShow(true)
          fetchSelfAndStore(user._id);
        })
        .catch(() => {})
    }
  });

  return (
    <Container>
      <Row>
        <Label>이름:</Label>
        <Body>{user.name}</Body>
      </Row>
      <Form onSubmit={formik.handleSubmit}>
        <PhoneVerifInput
          formik={formik}
          name='mobile'
          verifName='mobileVerif'
          label='휴대폰 번호'
          autosave
        />
      <Alert
        show={show}
        setShow={setShow}
        msg='저장되었습니다'
      />
      </Form>
    </Container>
  )
};

export default UserInfo;
