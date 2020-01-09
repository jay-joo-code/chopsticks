import React from 'react';
import styled from 'styled-components';
import SectCont from './../SectCont';
import InputCont from './../InputCont';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import OutlinedTextarea from 'src/components/common/form/OutlinedTextarea';
import useCategories from 'src/util/hooks/useCategories';
import Select from 'src/components/common/form/Select';

const SideText = styled.p`
  font-size: 1.2rem;
`

const SectOne = ({ formik }) => {
  const cat = useCategories();
  const priceSide = <SideText>원</SideText>;
  const stockSide = <SideText>개</SideText>;
  
  return (
    <SectCont>
      <InputCont>
        <OutlinedInput
          name="name"
          label="상품 이름 *"
          formik={formik}
        />
      </InputCont>
      <InputCont>
      <Select
        name='category'
        label='카테고리 *'
        formik={formik}
      >
        {cat.map((opt, i) => (
          <option key={i}>{opt.korean}</option>
        ))}
      </Select>
      </InputCont>
      <InputCont>
        <OutlinedTextarea
          name='content'
          label='제품 설명 *'
          formik={formik}
        />
      </InputCont>
      <InputCont width={20}>
        <OutlinedInput
          name="price"
          label="가격 *"
          formik={formik}
          sideButton={priceSide}
          right
        />
      </InputCont>
      <InputCont width={20}>
        <OutlinedInput
          name="stock"
          label="재고 *"
          formik={formik}
          sideButton={stockSide}
          right
        />
      </InputCont>
    </SectCont>
  )
};

export default SectOne;
