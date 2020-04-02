import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    width: 620px;
    height: 496px;
  }
`

const MainImg = ({ item }) => {
  return (
    <Container>
      <Img src={item.image} />
    </Container>
  )
};

export default MainImg;
