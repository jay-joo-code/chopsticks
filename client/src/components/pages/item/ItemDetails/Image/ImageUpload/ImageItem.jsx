import React from 'react';
import styled from 'styled-components';
import Card from 'src/components/common/cards/Card';

const ImgContainer = styled.div`
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`

const ImageItem = (props) => {
  return (
    <Card>
      <ImgContainer>
        <Img src={props.src} />
      </ImgContainer>
    </Card>
  )
};

export default ImageItem;
