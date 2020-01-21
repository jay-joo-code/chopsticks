import React from 'react';
import styled from 'styled-components';
import Purchase from './Purchase';
import Price from './Price';

const Container = styled.div`

`;

const BottomSection = (props) => (
  <Container>
    <Price {...props} />
    <Purchase />
  </Container>
);

export default BottomSection;
