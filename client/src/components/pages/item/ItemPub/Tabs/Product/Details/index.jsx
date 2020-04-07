import React from 'react';
import styled from 'styled-components';
import Intro from './Intro';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    width: 620px;
  }
`;

const Details = ({ item }) => (
  <Container>
    <Intro item={item} />
  </Container>
);

export default Details;
