import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AuthPanel from 'src/components/layout/AuthPanel';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import Button from 'src/components/common/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import log from 'src/util/log';
import api from 'src/util/api';
import { useSelector, useDispatch } from 'react-redux';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`

`;

const RegisterBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const RegisterBtn = styled(Link)`
  opacity: .8;
  margin-top: 2rem;
  cursor: auto;
  
  & > span {
    color: ${props => props.theme.primary};
    cursor: pointer;
  }
`;

const InfoContainer = styled.div`
  margin-top: 1rem;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    max-width: 200px;
  }
`

export const UnderlinedLink = styled(Link)`
  text-decoration: underline !important;
`;

const Input = styled(OutlinedInput)`
  margin: .5rem 0;
`

const Register = () => {
  // REDIRECT IF LOGGED IN
  const history = useHistory();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, []);

  const dispatch = useDispatch();

  // FORM
  const formik = useFormik({
    initialValues: {
      password: '',
      confpwd: '',
      email: '',
      name: '',
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
      name: Yup.string()
        .required('필수')
    }),
    onSubmit: (values) => {
      api.post('/user/create', values)
        .then(() => {
          api.post('/user/login', values)
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
          window.alert('이미 사용중인 이메일입니다');
        });
    },
  });

  return (
    <AuthPanel title="회원가입">
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <Input name="email" label="이메일" formik={formik} grey />
          <Input name="password" type="password" label="비밀번호" formik={formik} grey/>
          <Input name="confpwd" type="password" label="비밀번호 확인" formik={formik} grey/>
          <Input name="name" label="이름" formik={formik} grey/>
          <Button type="submit" inverted>동의하며 회원가입</Button>
        </form>
        <InfoContainer>
          <Link to='/terms/use'>
            <Body muted>본인은 만 14세 이상이며, chopsticks <UnderlinedLink to='/terms/use'>이용약관</UnderlinedLink>, <UnderlinedLink to='/terms/privacy'>개인정보 처리방침</UnderlinedLink> 내용을 확인 하였으며, 동의합니다.</Body>
          </Link>
        </InfoContainer>
        <RegisterBtnContainer>
          <RegisterBtn to="/login">이미 회원이시면 <span>로그인 하기</span></RegisterBtn>
        </RegisterBtnContainer>
      </Container>
    </AuthPanel>
  );
};

export default Register;
