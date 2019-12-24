import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from 'src/theme';

const halfDesktopWidth = Math.floor(theme.desktopContentWidth / 2);

const Container = styled.div`
  background-color: white;
  border: 1px solid grey;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    width: ${halfDesktopWidth}px;
    height: ${halfDesktopWidth}px;
    padding-bottom: 0;
  }
`;

const Img = styled.img`

`

const Image = (props) => {
  const [src, setSrc] = useState();
  if (props.images && props.images.length !== 0) {
    setSrc(props.images[0]);
  }
  
  // TODO: CONDITIONALLY SET src
  
  return (
    <Container>
        <Img src={null} />
    </Container>
  )
};

export default Image;
