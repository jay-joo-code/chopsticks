import React from 'react';
import styled from 'styled-components';
import SectCont from './../SectCont';
import RepImage from './RepImage';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import useCategories from 'src/util/hooks/useCategories';
import useStyles from 'src/util/hooks/useStyles';
import Select from 'src/components/common/form/Select';
import InputCont from './../InputCont';

const Row = styled.div`
  display: flex;
  align-items: center;
  
  & > div {
    margin-right: 1rem;
  }
`

const ProdInfo = ({formik, _id }) => {
  const cat = useCategories();
  const styles = useStyles();
  const hasCat = formik.values.category && cat && cat.length !== 0;
  const currentCat = hasCat
    ? cat.filter((category) => category.name === formik.values.category)
    : []
  const subcats = currentCat && currentCat.length > 0 
    ? currentCat[0].sub
    : []
  
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
        <Select
          name="style"
          label="디자인 타입 *"
          formik={formik}
        >
          {styles.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </Select>
      </InputCont>
      <InputCont>
      <Row>
        <Select
          name="category"
          label="카테고리 *"
          formik={formik}
        >
          {cat.map((opt) => (
            <option key={opt.name} value={opt.name}>{opt.korean}</option>
          ))}
        </Select>
        {formik.values.category && 
          <Select
            name="subcat"
            label="세부 카테고리 *"
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
