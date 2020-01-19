import React, { useState } from 'react';
import styled from 'styled-components';
import AuthPanel from 'src/components/layout/AuthPanel';
import FormikInput from 'src/components/common/form/FormikInput';
import Button from 'src/components/common/buttons/RedButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import log from 'src/util/log';
import { useDispatch } from 'react-redux';
import ErrMsg from 'src/components/common/form/ErrMsg';
import OutlinedInput from 'src/components/common/form/OutlinedInput';

const Container = styled.div`

`;

const BtnCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

const StyledInput = styled(OutlinedInput)`
  background-color: rgba(0, 0, 0, .1)
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
  const dispatch = useDispatch();
  const history = useHistory();
  const [errmsg, setErrmsg] = useState('');
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
      axios.post('/api/user/login', values)
        .then((res) => {
          dispatch({
            type: 'USER_SET',
            payload: res.data,
          });
          history.push('/');
        })
        .catch((e) => {
          log('ERROR login failed', e);
          setErrmsg('로그인 실패');
        });
    },
  });

  return (
    <AuthPanel title="로그인">
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <StyledInput name="email" placeholder="이메일" formik={formik} />
          <StyledInput name="password" type="password" placeholder="비밀번호" formik={formik} />
          <BtnCont>
            <Button type="submit" green>로그인</Button>
            {errmsg && (<ErrMsg>{errmsg}</ErrMsg>)}
          </BtnCont>
        </form>
        <RegisterBtnContainer>
          <RegisterBtn to="/register">회원가입</RegisterBtn>
        </RegisterBtnContainer>
      </Container>
    </AuthPanel>
  );
};

export default Login;
