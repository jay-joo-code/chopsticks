import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FileUpload from 'src/components/common/form/FileUpload';
import Label from 'src/components/common/form/Label';
import ErrMsg from 'src/components/common/form/ErrMsg';

const Wrapper = styled.div`
  
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1rem;
`;

const Img = styled.img`
  object-fit: cover;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, .05);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  flex-shrink: 0;
`;

const DescSection = styled.div`
  margin-left: 2rem;
  flex-shrink: 2;
`;

const ImageInput = ({
  formik, name, label, path,
}) => {
  const setSrc = (src) => {
    if (src) formik.setFieldValue(name, src);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Container>
        <Img
          src={formik.values[name]}
        />
        <DescSection>
          <FileUpload
            path={path}
            setSrc={setSrc}
          />
          {formik.errors[name]
            ? <ErrMsg>{formik.errors[name]}</ErrMsg>
            : null}
        </DescSection>
      </Container>
    </Wrapper>
  );
};

export default ImageInput;
