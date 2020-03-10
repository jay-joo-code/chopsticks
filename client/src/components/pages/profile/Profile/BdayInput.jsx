import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SmartErrMsg from 'src/components/common/form/SmartErrMsg';

const Container = styled.div`
  margin: 2rem 0;
`;

const PickerWrapper = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  padding: .5rem;
  margin-top: .5rem;
  cursor: pointer;
`

const BdayInput = ({ formik }) => {
  // set init bday 
  const initDate = formik.values.bday;
  const initIsDate = initDate instanceof Date && !isNaN(initDate);
  const initVal = initIsDate ? new Date(formik.values.bday) : new Date();
  
  const [bday, setBday] = useState(initVal);
  
  const handleChange = (date) => {
    setBday(date)
  }
  
  useEffect(() => {
    formik.setFieldValue('bday', bday);
  }, [bday])

  return (
    <Container>
      <p>생년월일</p>
      <PickerWrapper>
        <DatePicker
          selected={bday}
          onChange={handleChange}
        />
      </PickerWrapper>
      <SmartErrMsg
        formik={formik}
        name='bday'
      />
    </Container>
  )
};

export default BdayInput;
