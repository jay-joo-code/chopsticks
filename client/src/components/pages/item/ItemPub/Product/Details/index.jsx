import React from 'react';
import styled from 'styled-components';
import Intro from './Intro';

const Container = styled.div`
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    width: 620px;
  }
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
`

const Details = ({ item }) => (
  <Container>
    <Img src={item.image} />
    <Intro item={item} />
  </Container>
);

export default Details;
