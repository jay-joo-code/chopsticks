import React, { useEffect } from 'react';
import styled from 'styled-components';
import SectCont from './../SectCont';
import InputCont from './../InputCont';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import Checkbox from 'src/components/common/form/Checkbox';
import Opts from './Opts';

const CheckboxContainer = styled.div`
  
`

const SellerOpts = ({ formik, _id }) => {
  const { optGrps, madeOnOrder } = formik.values;
  const disableItemStock = madeOnOrder || optGrps.length !== 0;

  return (
    <SectCont>
      <InputCont>
        <OutlinedInput
          name="price"
          label="가격 *"
          formik={formik}
          sideText="원"
          right
          width={200}
        />
      </InputCont>
      <InputCont>
        <CheckboxContainer>
          <Checkbox
            name="madeOnOrder"
            label="주문 후 제작"
            formik={formik}
          />
        </CheckboxContainer>
        <InputCont>
          <OutlinedInput
            name="stock"
            label="재고 *"
            formik={formik}
            sideText="개"
            right
            disabled={disableItemStock}
            width={200}
          />
        </InputCont>
      </InputCont>
      <InputCont>
        <Opts
          formik={formik}
        />
      </InputCont>
    </SectCont>
  )
};

export default SellerOpts;
