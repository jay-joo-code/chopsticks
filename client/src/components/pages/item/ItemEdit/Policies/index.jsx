import React from 'react';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import styled from 'styled-components';
import Label from 'src/components/common/fonts/Label';
import Body from 'src/components/common/fonts/Body';
import InputCont from '../InputCont';
import SectCont from '../SectCont';

const InlineCont = styled.div`
  display: flex;
  align-items: center;
`;

const Duration = styled.p`
  padding: 0 .5rem;
`;

const SectThree = ({ formik }) => (
  <SectCont>
    <InputCont>
      <Label>제작 기간 *</Label>
      <Body muted>*제작 기간이 필요한 제품이라면 제작에 소요되는 기간을 입력해 주세요.</Body>
      <InlineCont>
        <OutlinedInput
          name="processingMin"
          formik={formik}
          width={100}
        />
        <Duration>~</Duration>
        <OutlinedInput
          name="processingMax"
          formik={formik}
          width={100}
          sideText='이내'
        />
      </InlineCont>
    </InputCont>
    <InputCont>
      <Label>배송 기간 *</Label>
      <InlineCont>
        <OutlinedInput
          name="deliveryMin"
          formik={formik}
          width={100}
        />
        <Duration>~</Duration>
        <OutlinedInput
          name="deliveryMax"
          formik={formik}
          width={100}
          sideText='이내'
        />
      </InlineCont>
    </InputCont>
    <InputCont width={20}>
      <OutlinedInput
        name="deliveryCost"
        label="배송 비용"
        formik={formik}
        sideText="원"
        right
        width={150}
      />
    </InputCont>
  </SectCont>
);

export default SectThree;
