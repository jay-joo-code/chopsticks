import React, { useState } from 'react';
import styled from 'styled-components';
import OutlinedButton from 'src/components/common/buttons/OutlinedButton';
import RedButton from 'src/components/common/buttons/RedButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import PhoneVerifInput from 'src/components/common/form/PhoneVerifInput';
import OutlinedTextarea from 'src/components/common/form/OutlinedTextarea';
import { useSelector } from 'react-redux';
import axios from 'axios';
import log from 'src/util/log';
import { useHistory } from 'react-router-dom';


const Form = styled.form`

`;

const TitleVerif = styled.div`
  font-size: .7rem;
  color: ${(props) => props.theme.green};
  margin-top: .5rem;
`;

const BtnCont = styled.div`
  display: flex;
  justify-content: center;
`;

const AppForm = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [titleVerif, setTitleVerif] = useState(false);
  const firstThree = ['010', '011', '016', '017', '018', '019'];
  const formik = useFormik({
    initialValues: {
      id: user._id,
      title: '',
      email: user.email,
      mobile: user.mobile || '',
      mobileVerif: user.mobileVerif || false,
      intro: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('필수')
        .matches(/^[\w가-힣.-]+$/, '특수문자는 .-_ 만 가능합니다'),
      email: Yup.string()
        .email('이메일 형식 오류')
        .required('필수'),
      mobile: Yup.string()
        .min(10, '최소 10자')
        .max(11, '최대 11자')
        .matches(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g, '형식이 틀립니다')
        .test('firstThree', '첫 3자는 010, 011,016, 017, 018, 019 중에 하나이여야 됩니다', v => v && firstThree.includes(v.substring(0, 3)))
        .required('필수'),
      mobileVerif: Yup.bool().oneOf([true], '휴대폰 인증은 필수입니다'),
      intro: Yup.string()
        .required('필수'),
    }),
    onSubmit: (values, { setFieldError }) => {
      if (!titleVerif) {
        setFieldError('title', '중복 확인해주세요');
      } else {
        axios.post('/api/shop/apply', values)
          .then((res) => {
            history.push('/shop/apply/pending');
          })
          .catch((e) => {
            log('ERROR submit apply shop form', e);
          });
      }
    },
  });
  const checkTitleAvail = () => {
    const { title } = formik.values;
    if (title.length > 0) {
      axios.get(`/api/shop/check-title?title=${title}`)
        .then((res) => {
          setTitleVerif(true);
          formik.setFieldError('title', '');
        })
        .catch((e) => {
          setTitleVerif(false);
          formik.setFieldError('title', '이미 사용중인 이름입니다');
        });
    } else {
      setTitleVerif(false);
      formik.setFieldError('title', '이름을 입력해주세요');
    }
  };

  const titleSideButton = (
    <OutlinedButton
      type="button"
      onClick={checkTitleAvail}
    >
    중복 확인
    </OutlinedButton>
  );

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="apply">
        <ul>
          <li>
            <OutlinedInput
              name="title"
              label="샵이름 *"
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
              name="email"
              label="이메일 *"
              formik={formik}
              disabled="disabled"
            />
          </li>
          <li>
            <PhoneVerifInput
              name="mobile"
              verifName="mobileVerif"
              label="전화번호 *"
              formik={formik}
            />
          </li>
          <li>
            <OutlinedTextarea
              name="intro"
              label="샵 소개"
              guideline='*창작자, 브랜드, 스튜디오에 대한 소개를 해주세요. 해당 내용은 상품 상세 페이지에서 함께 노출됩니다.'
              formik={formik}
            />
          </li>
        </ul>
      </div>
      <BtnCont>
        <RedButton type="submit" id='submit-btn'>입점 신청</RedButton>
      </BtnCont>
    </Form>
  );
};

export default AppForm;
