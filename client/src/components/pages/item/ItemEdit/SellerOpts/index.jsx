import React from 'react';
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
        {(madeOnOrder || optGrps.length !== 0)
          ? <div />
          : (
            <InputCont>
              <OutlinedInput
                name="stock"
                label="재고 *"
                formik={formik}
                sideText="개"
                right
                width={200}
              />
            </InputCont>
          )}
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
