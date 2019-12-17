import React from 'react';
import styled from 'styled-components';
import AuthPanel from 'src/components/layout/AuthPanel';
import FormikInput from 'src/components/common/form/FormikInput';
import Button from 'src/components/common/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const Container = styled.div`

`;

const RegisterBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const RegisterBtn = styled(Link)`
  text-decoration: underline;
  opacity: .8;
  margin-top: 2rem;
`;

const Login = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, '최소 6자리')
        .required('필수'),
      email: Yup.string()
        .email('이메일 형식 오류')
        .required('필수'),
    }),
    onSubmit: (values) => {
      // TODO: HANDLE SUBMIT
    },
  });

  return (
    <AuthPanel title="로그인">
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <FormikInput name="email" placeholder="이메일" formik={formik} />
          <FormikInput name="password" type="password" placeholder="비밀번호" formik={formik} />
          <Button type="submit" inverted>로그인</Button>
        </form>
        <RegisterBtnContainer>
          <RegisterBtn to="/register">회원가입</RegisterBtn>
        </RegisterBtnContainer>
      </Container>
    </AuthPanel>
  );
};

export default Login;
