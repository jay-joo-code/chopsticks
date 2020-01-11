import React from 'react';
import styled from 'styled-components';
import SectCont from './../SectCont';
import InputCont from './../InputCont';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import OutlinedTextarea from 'src/components/common/form/OutlinedTextarea';
import useCategories from 'src/util/hooks/useCategories';
import Select from 'src/components/common/form/Select';
import Checkbox from 'src/components/common/form/Checkbox';
import SideText from 'src/components/common/form/SideText';

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
          <option key={i} value={opt.name}>{opt.korean}</option>
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
          sideText='원'
          right
        />
      </InputCont>
      <InputCont>
        <Checkbox
          name='madeOnOrder'
          label='주문 후 제작'
          formik={formik}
        />
      </InputCont>
      {formik.values.madeOnOrder
        ? <div />
        : (
      <InputCont width={20}>
        <OutlinedInput
          name="stock"
          label="재고 *"
          formik={formik}
          sideText='개'
          right
        />
      </InputCont>
      )}
    </SectCont>
  )
};

export default SectOne;
