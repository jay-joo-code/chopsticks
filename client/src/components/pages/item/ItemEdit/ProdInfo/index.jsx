import React from 'react';
import styled from 'styled-components';
import SectCont from './../SectCont';
import RepImage from './RepImage';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import RadioGroup from 'src/components/common/form/RadioGroup';
import useCategories from 'src/util/hooks/useCategories';
import Select from 'src/components/common/form/Select';
import InputCont from './../InputCont';
import Body from 'src/components/common/fonts/Body';
import Label from 'src/components/common/fonts/Label';


const Row = styled.div`
  display: flex;
  align-items: center;
  
  & > div {
    margin-right: 1rem;
  }
`

const ProdInfo = ({formik, _id }) => {
  // category
  const categories = useCategories();
  const hasCat = formik.values.category && categories && categories.length !== 0;
  const currentCat = hasCat
    ? categories.filter((category) => category.name === formik.values.category)
    : []
  if (formik.values.category && currentCat.length === 0) {
    // old category, reset to null
    formik.setFieldValue('category', 'Product');
    formik.setFieldValue('subcat', '');
  }
  const subcats = currentCat && currentCat.length > 0 
    ? currentCat[0].sub
    : []
    
  // styles
  const opts = [{
    label: 'Original Design',
    value: 'Original',
    sideLabel: '*창작자 고유의 디자인을 기반으로 제작된 새롭고 창의적인 디자인 제품'
  }, {
    label: 'Craft Design',
    value: 'Crafted',
    sideLabel: '*창작자의 독창성과 개성을 담아 금형을 사용하지 않고 손으로 직접 작업한 공예ㆍ디자인 제품'
  }]
  
  return (
    <SectCont>
      <RepImage formik={formik} _id={_id} />
      <InputCont>
        <OutlinedInput
          name="name"
          label="상품 이름 *"
          formik={formik}
        />
      </InputCont>
      <InputCont>
        <RadioGroup
          name='style'
          label='다지인 타입 *'
          formik={formik}
          opts={opts}
        />
      </InputCont>
      <InputCont>
        <Label>카테고리</Label>
        <Body muted mb={.5}>*상품을 찾는데 도움이 되도록, 상품과 가장 잘 어울리는 카테고리를 선택해주세요.</Body>
        <Row>
          <Select
            name="category"
            formik={formik}
          >
            {categories.map((opt) => (
              <option key={opt.name} value={opt.name}>{opt.name}</option>
            ))}
          </Select>
          {formik.values.category && subcats && subcats.length > 0 &&
            <Select
              name="subcat"
              formik={formik}
            >
              {subcats.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </Select>
          }
        </Row>
      </InputCont>
    </SectCont>
  )
};

export default ProdInfo;
