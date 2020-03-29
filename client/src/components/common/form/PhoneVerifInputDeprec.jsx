import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import OutlinedButton from 'src/components/common/buttons/OutlinedButton';
import firebase from 'src/firebase';
import Muted from 'src/components/common/fonts/Muted';
import ErrMsg from 'src/components/common/fonts/ErrMsg';
import { useSelector } from 'react-redux';
import Loading from 'src/components/common/displays/Loading';
import api from 'src/util/api';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import log from 'src/util/log';
import useScript from 'src/util/hooks/useScript';

const Container = styled.div`

`;

const Btn = styled(OutlinedButton)`
  flex-grow: 2;
`

const Msg = styled(Muted)`
  color: ${props => props.theme.primary};
`

const PhoneVerifInput = ({ formik, name, verifName, label, autosave, submitId }) => {
  // recaptcha
  useScript('https://www.google.com/recaptcha/api.js');
  const [ref, setRef] = useState();
  
  useEffect(() => {
    if (!ref) return;
    
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(ref, {
      'size': 'invisible'
    });
    
    window.recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });
  }, [ref]);
  
  const [code, setCode] = useState();
  const [pendingAuth, setPendingAuth] = useState(false);
  
  const resetRecaptcha = () => {
    window.grecaptcha.reset(window.recaptchaWidgetId);
  }
  
  // send code  
  const auth = () => {
    setPendingAuth(true);
    var appVerifier = window.recaptchaVerifier;
    const phoneNumber = '+82' + formik.values[name];
    
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        setPendingAuth(false);
        resetRecaptcha();
      });
  }
  
  // confirm code
  const cnfAuth = () => {
    if (!window.confirmationResult) return;
    window.confirmationResult.confirm(code)
      .then((result) => {
        // success
        formik.setFieldValue(verifName, true);
        
        if (autosave) {
          formik.submitForm()  
        }
      })
      .catch((error) => {
        // fail, bad code
        formik.touched[verifName] = true;
        formik.setFieldError(verifName, '인증 번호가 알맞지 않습니다');
      });
  }
  
  // reset err msg on code change
  useEffect(() => {
    formik.setFieldError(verifName, '');
  }, [code])
  
  // reset auth on number change
  const user = useSelector((state) => state.user)
  useEffect(() => {
    if (user && user.mobile !== formik.values[name]) {
      // reset 
      formik.setFieldValue(verifName, false);
      setCode('');
      
      if (pendingAuth) {
        setPendingAuth(false);
        resetRecaptcha();
      }
      
      if (autosave) {
        let data ={};
        data[verifName] = false;
        api.put(`/user/${user._id}/update`, data)
          .then(() => fetchSelfAndStore(user._id))
          .catch((e) => log('ERROR autosave reset mobileVerif', e))
      }
    }
  }, [formik.values[name]])
  
  // btn
  const authed = formik.values[verifName];
  const btn = <Btn 
      onClick={auth}
      type='button'
    >
      인증
    </Btn>
  const authBtn = pendingAuth ? <Loading /> : btn;
  
  const cnfBtn = (
    <Btn
      onClick={cnfAuth}
      type='button'
      id='auth-btn'
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
        sideButton={authed ? null : authBtn}
        placeholder='전화번호'
      />
      {!authed &&
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
      <div ref={(ref)=> setRef(ref)} />
    </Container>
  )
};

export default PhoneVerifInput;
