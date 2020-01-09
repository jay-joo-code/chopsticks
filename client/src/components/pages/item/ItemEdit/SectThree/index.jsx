import React from 'react';
import SectCont from './../SectCont';
import InputCont from './../InputCont';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import styled from 'styled-components';
import Label from 'src/components/common/form/Label';

const InlineCont = styled.div`
  display: flex;
  align-items: center;
`

const Duration = styled.p`
  padding: 0 .5rem;
`

const SectThree = ({ formik }) => {
  return (
    <SectCont>
    <InputCont>
    <Label>제작 기간 *</Label>
    <InlineCont>
        <OutlinedInput
          name="processingMin"
          formik={formik}
        />
      <Duration>~</Duration>
        <OutlinedInput
          name="processingMax"
          formik={formik}
        />
    </InlineCont>
    </InputCont>  
    <InputCont>
    <Label>배송 기간 *</Label>
    <InlineCont>
        <OutlinedInput
          name="deliveryMin"
          formik={formik}
        />
      <Duration>~</Duration>
        <OutlinedInput
          name="deliveryMax"
          formik={formik}
        />
    </InlineCont>
    </InputCont>
    </SectCont>
  )
};

export default SectThree;
