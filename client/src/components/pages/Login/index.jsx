import React, { useState } from 'react';
import styled from 'styled-components';
import AuthPanel from 'src/components/layout/AuthPanel';
import Button from 'src/components/common/buttons/RedButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from 'src/util/api';
import log from 'src/util/log';
import ErrMsg from 'src/components/common/form/ErrMsg';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';

const Container = styled.div`
  
`;

const Input = styled(OutlinedInput)`
  margin: .2rem 0;
`

const BtnCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
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
      api.post('/user/login', values)
        .then((res) => {
          fetchSelfAndStore(res.data._id);
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
          <Input 
            name="email" 
            placeholder="이메일" 
            formik={formik} 
            grey 
          />
          <Input 
            name="password" 
            type="password" 
            placeholder="비밀번호" 
            formik={formik} 
            grey
          />
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
