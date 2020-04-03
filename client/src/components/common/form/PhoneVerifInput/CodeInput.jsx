import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ErrMsg from 'src/components/common/fonts/ErrMsg';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import OutlinedButton from 'src/components/common/buttons/OutlinedButton';
import { useSelector } from 'react-redux';
import api from 'src/util/api';
import log from 'src/util/log';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';

const Container = styled.div`
  margin-top: .5rem;
`;

const Btn = styled(OutlinedButton)`
  flex-grow: 2;
`

const CodeInput = ({ code, setCode, formik, name, verifName, codeSent, setCodeSent, autosave }) => {
  const [value, setValue] = useState();
  const [msg, setMsg] = useState('')
  console.log(formik.values[verifName])
  const user = useSelector((state) => state.user);
  const auth = () => {
    if (!value) setMsg('코드를 입력해주세요')
    else if (value !== code) setMsg('코드가 알맞지 않습니다')
    else {
      formik.setFieldValue(verifName, true);
      
      if (autosave) {
        const data = {
          mobile: formik.values[name],
          mobileVerif: true
        }
        api.put(`/user/${user._id}/update`, data)
          .then((res) => fetchSelfAndStore(user._id))
          .catch((e) => log(`ERROR CodeInput`, e))
      }
    }
  }
  
  // reset on number change
  useEffect(() => {
    if (formik.values[verifName] && formik.values[name] !== user.mobile) {
      formik.setFieldValue(verifName, false);
      setCode('');
      setCodeSent(false);
      setValue('');
      setMsg('')
    }
  }, [formik.values[name]])
  
  const cnfBtn = (
    <Btn
      onClick={auth}
      type='button'
      id='auth-btn'
    >
      확인
    </Btn>
    )
    
  if (!codeSent || formik.values[verifName]) return <div />;
  
  return (
    <Container>
      <OutlinedInput
        onChange={(e) => setValue(e.target.value)}
        value={value}
        sideButton={cnfBtn}
        placeholder='인증번호'
      />
      <ErrMsg>{msg}</ErrMsg>
    </Container>
  )
};

export default CodeInput;
