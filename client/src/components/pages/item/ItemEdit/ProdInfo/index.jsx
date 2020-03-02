import React from 'react';
import SectCont from './../SectCont';
import RepImage from './RepImage';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import useCategories from 'src/util/hooks/useCategories';
import useStyles from 'src/util/hooks/useStyles';
import Select from 'src/components/common/form/Select';
import InputCont from './../InputCont';

const ProdInfo = ({formik, _id }) => {
  const cat = useCategories();
  const styles = useStyles();
  
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
      <Select
        name="category"
        label="카테고리 *"
        formik={formik}
      >
        {cat.map((opt) => (
          <option key={opt.name} value={opt.name}>{opt.korean}</option>
        ))}
      </Select>
      </InputCont>
    </SectCont>
  )
};

export default ProdInfo;
