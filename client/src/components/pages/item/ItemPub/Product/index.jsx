import React from 'react';
import styled from 'styled-components';
import Owner from './Owner';
import Details from './Details';
import Purchase from './Purchase';

const Container = styled.div`
  padding: 2rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Product = () => (
  <Container>
    <Wrapper>
      <Owner />
      <Details />
      <Purchase />
    </Wrapper>
  </Container>
);

export default Product;
