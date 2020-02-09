import React, { useState, useEffect } from 'react';
import FileUpload from 'src/components/common/form/FileUpload';
import ErrMsg from 'src/components/common/form/ErrMsg';
import Label from 'src/components/common/form/Label';
import styled from 'styled-components';
import ImgDisplay from './ImgDisplay';
import SectCont from '../SectCont';

const LabelCont = styled.div`
  padding: 1rem 0;
`;

const SectImg = ({ formik, _id }) => {
  const [src, setSrc] = useState();
  useEffect(() => {
    if (src && src.length > 0) {
      formik.setFieldValue('image', src);
    }
  }, [src]);
  return (
    <SectCont>
      <LabelCont>
        <Label>대표 사진 *</Label>
      </LabelCont>
      <FileUpload
        path={`/items/${_id}`}
        setSrc={setSrc}
      />
      {formik.errors.image && formik.touched.image
        ? <ErrMsg>{formik.errors.image}</ErrMsg>
        : <div />}
      <ImgDisplay src={formik.values.image} />
    </SectCont>
  );
};

export default SectImg;
