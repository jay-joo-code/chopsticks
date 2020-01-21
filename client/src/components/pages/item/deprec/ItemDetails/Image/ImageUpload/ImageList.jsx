import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import ImageItem from './ImageItem';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageList = (props) => {
  if (!props.images) return <div />;

  return (
    <Container>
      {props.images.map((src, i) => (
        <ImageItem key={i} src={src} />
      ))}
    </Container>
  );
};

export default ImageList;
