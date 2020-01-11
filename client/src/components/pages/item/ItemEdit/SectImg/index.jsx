import React, { useState, useEffect } from 'react';
import SectCont from './../SectCont';
import FileUpload from 'src/components/common/form/FileUpload';
import ImageList from './ImageList';
import ErrMsg from 'src/components/common/form/ErrMsg';
import Label from 'src/components/common/form/Label';
import styled from 'styled-components';

const LabelCont = styled.div`
  padding: 1rem 0;
`

const SectImg = ({ formik, _id }) => {
  const [src, setSrc] = useState();
  useEffect(() => {
    if (src && src.length > 0) {
      let newImages = [...formik.values.images];
      newImages.push(src)
      formik.setFieldValue('images', newImages);
    }
  }, [src])
  return (
    <SectCont>
      <LabelCont>
      <Label>대표 사진 *</Label>
      </LabelCont>
      <FileUpload 
        path={`/items/${_id}`}
        setSrc={setSrc}
      />
      {formik.errors.images && formik.touched.images
        ? <ErrMsg>{formik.errors.images}</ErrMsg>
        : <div />
      }
      <ImageList formik={formik} /> 
    </SectCont>
  )
};

export default SectImg;
