import React, { useState } from 'react';
import styled from 'styled-components';
import OutlinedButton from 'src/components/common/buttons/OutlinedButton';
import RedButton from 'src/components/common/buttons/RedButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import OutlinedTextarea from 'src/components/common/form/OutlinedTextarea';
import { useSelector } from 'react-redux';
import axios from 'axios';
import log from 'src/util/log';

const Form = styled.form`

`

const TitleVerif = styled.div`
  font-size: .7rem;
  color: ${props => props.theme.green};
  margin-top: .5rem;
`;

const BtnCont = styled.div`
  display: flex;
  justify-content: center;
`

const AppForm = () => {
  const user = useSelector((state) => state.user);
  const [titleVerif, setTitleVerif] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: '',
      email: user.email,
      mobile: '',
      intro: ''
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(16, '최대 16자')
        .required('필수'),
      email: Yup.string()
        .email('이메일 형식 오류')
        .required('필수'),
      mobile: Yup.number()
        .typeError('숫자만 기입해주세요')
        .required('필수'),
      intro: Yup.string()
        .required('필수')
    }),
    onSubmit: (values, { setFieldError }) => {
      if (!titleVerif) {
        setFieldError('title', '중복 확인해주세요')
      }
      else {
        log('submit', values)
      }
    },
  });
  const checkTitleAvail = () => {
    const title = formik.values.title;
    if (title.length > 0) {
      axios.get(`/api/shop/check-title?title=${title}`)
        .then((res) => {
          setTitleVerif(true);
          formik.setFieldError('title', '')
        })
        .catch((e) => {
          setTitleVerif(false);
          formik.setFieldError('title', '이미 사용중인 이름입니다')
        })
    }
    else {
      setTitleVerif(false);
      formik.setFieldError('title', '이름을 입력해주세요')
    }
  }
  
  const titleSideButton = (
    <OutlinedButton 
      type='button' 
      onClick={checkTitleAvail}
    >
    중복 확인
    </OutlinedButton>
  )
  
  return (
  <Form onSubmit={formik.handleSubmit}>
    <div className="apply">
      <ul>
        <li>
          <OutlinedInput
            name='title'
            label='샵이름 *'
            formik={formik}
            sideButton={titleSideButton}
          />
          {titleVerif && (
            <TitleVerif>
              {titleVerif && '가능한 이름입니다'}
            </TitleVerif>
          )}
        </li>
        <li>
          <OutlinedInput
            name='email'
            label='이메일 *'
            formik={formik}
            disabled="disabled"
          />
        </li>
        <li>
          <OutlinedInput
            name='mobile'
            label='전화번호 *'
            formik={formik}
          />
        </li>
        <li>
          <OutlinedTextarea
            name='intro'
            label='작품 / 본인 소개 *'
            formik={formik}
          />
        </li>
      </ul>
    </div>
    <p className="txt2">입점신청 후 1주일 안에 연락을 드립니다.</p>
    <BtnCont>
      <RedButton type='submit'>입점 신청</RedButton>
    </BtnCont>
  </Form>
  )
};

export default AppForm;
