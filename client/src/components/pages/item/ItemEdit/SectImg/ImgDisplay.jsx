import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 2rem 0;
`;

const Img = styled.img`
  object-fit: cover;
  width: 280px;
  height: 350px;
`

const ImgDisplay = ({ src }) => {
  return (
    <Container>
      <Img src={src} />
    </Container>
  )
};

export default ImgDisplay;
