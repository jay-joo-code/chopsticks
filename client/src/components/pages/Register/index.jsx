import React from 'react';
import styled from 'styled-components';
import AuthPanel from 'src/components/layout/AuthPanel';
import FormikInput from 'src/components/common/form/FormikInput';
import Button from 'src/components/common/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import log from 'src/util/log';

import { useDispatch } from 'react-redux';

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
  const history = useHistory();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: '',
      confpwd: '',
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, '최소 6자리')
        .required('필수'),
      confpwd: Yup.string().when('password', {
        is: (val) => (!!(val && val.length > 0)),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          '비밀번호 불일치',
        ),
      }),
      email: Yup.string()
        .email('이메일 형식 오류')
        .required('필수'),
    }),
    onSubmit: (values) => {
      axios.post('/api/user/create', values)
        .then(() => {
          axios.post('/api/user/login', values)
            .then((res) => {
              dispatch({
                type: 'USER_SET',
                payload: res.data,
              });
              window.alert('성공! 자동으로 로그인 됬습니다');
              history.push('/');
            })
            .catch((e) => {
              log('auto login failed', e);
            });
        })
        .catch((e) => {
          log('register failed', e);
          window.alert('회원가입 실패. 다시 시도 해주세요');
        });
    },
  });

  return (
    <AuthPanel title="회원가입">
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <FormikInput name="email" placeholder="이메일" formik={formik} />
          <FormikInput name="password" type="password" placeholder="비밀번호" formik={formik} />
          <FormikInput name="confpwd" type="password" placeholder="비밀번호 확인" formik={formik} />
          <Button type="submit" inverted>회원가입</Button>
        </form>
        <RegisterBtnContainer>
          <RegisterBtn to="/login">이미 회원이신가요? 로그인</RegisterBtn>
        </RegisterBtnContainer>
      </Container>
    </AuthPanel>
  );
};

export default Login;
