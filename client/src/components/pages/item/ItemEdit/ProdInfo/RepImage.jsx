import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImgDisplay from './ImgDisplay';
import Label from 'src/components/common/fonts/Label';
import FileUpload from 'src/components/common/form/FileUpload';
import ErrMsg from 'src/components/common/fonts/ErrMsg';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`

`;

const LabelCont = styled.div`
  margin-bottom: 1rem;
`

const RepImage = ({ formik, _id }) => {
  const [src, setSrc] = useState();
  useEffect(() => {
    if (src && src.length > 0) {
      formik.setFieldValue('image', src);
    }
  }, [src]);
  
  
  return (
    <Container>
      <LabelCont>
        <Label>대표 사진 *</Label>
        <Body>*최소 280 x 350px 이상의 이미지를 권장합니다. (비율 4:5)</Body>
      </LabelCont>
      <FileUpload
        path={`/items/${_id}`}
        setSrc={setSrc}
      />
      {formik.errors.image && formik.touched.image
        ? <ErrMsg>{formik.errors.image}</ErrMsg>
        : <div />}
      <ImgDisplay src={formik.values.image} />
    </Container>
  )
};

export default RepImage;
