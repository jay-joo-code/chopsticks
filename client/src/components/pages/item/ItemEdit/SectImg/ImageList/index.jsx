import React from 'react';
import styled from 'styled-components';
import ListElt from './ListElt';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem 0;
`;

const ImageList = ({ formik }) => (
  <Container>
    {formik.values.images.map((src, i) => (
      <ListElt key={src} src={src} i={i} formik={formik} />
    ))}
  </Container>
);

export default ImageList;
