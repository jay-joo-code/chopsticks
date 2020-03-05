import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import OutlinedButton from 'src/components/common/buttons/OutlinedButton';
import firebase from 'src/firebase';
import Muted from 'src/components/common/fonts/Muted';
import ErrMsg from 'src/components/common/fonts/ErrMsg';
import { useSelector } from 'react-redux';

const Container = styled.div`

`;

const Btn = styled(OutlinedButton)`
  flex-grow: 2;
`

const Msg = styled(Muted)`
  color: ${props => props.theme.primary};
`

const PhoneVerifInput = ({ formik, name, verifName, label }) => {
  // recaptcha
  const [hasCaptcha, setHasCaptcha] = useState(false);
  const setRecaptcha = () => {
    if (!hasCaptcha) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('auth-btn', {
        'size': 'invisible',
        'callback': function(response) {
          setHasCaptcha(true);
        },
        'expired-callback': () => {
          // recaptcha failed
        }
      });
    }
  }
  setTimeout(setRecaptcha, 1000)
  
  // auth
  const [sentSms, setSentSms] = useState(false);
  const [code, setCode] = useState();
  const auth = () => {
    var appVerifier = window.recaptchaVerifier;
    const phoneNumber = '+82' + formik.values[name];
    
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // sms sent
        window.confirmationResult = confirmationResult;
        setSentSms(true);
      }).catch((error) => {
        // Error; SMS not sent
        formik.setFieldError(name, '인증 서버에 문제가 있습니다. 페이지 새로고침 후 다시 시도해주세요')
      });
  }
  
  const cnfAuth = () => {
    window.confirmationResult.confirm(code).then(function (result) {
      // success
      formik.setFieldValue(verifName, true);
    }).catch(function (error) {
      // fail, bad code
      formik.setFieldError(name, '인증 번호가 알맞지 않습니다')
    });
  }
  
  // reset auth on mobile change
  const user = useSelector((state) => state.user)
  useEffect(() => {
    if (user && user.mobile !== formik.values[name]) {
      formik.setFieldValue(verifName, false);
    }
  }, [formik.values[name], user])
  
  // conditional rendering
  const authed = formik.values[verifName];
  const btn = <Btn 
      onClick={auth}
      type='button'
      id='auth-btn'
    >
      인증
    </Btn>
  
  const cnfBtn = (
    <Btn
      onClick={cnfAuth}
      type='button'
    >
      확인
    </Btn>
    )
  
  return (
    <Container>
      <OutlinedInput
        formik={formik}
        name={name}
        label={label}
        sideButton={authed ? null : btn}
      />
      {sentSms && !authed &&
        <OutlinedInput
          onChange={(e) => setCode(e.target.value)}
          value={code}
          sideButton={cnfBtn}
          placeholder='인증번호'
        />
      }
      {authed && <Msg>인증완료</Msg>}
      {formik.errors[verifName] && formik.touched[verifName] &&
        <ErrMsg>{formik.errors[verifName]}</ErrMsg>
      }
    </Container>
  )
};

export default PhoneVerifInput;
