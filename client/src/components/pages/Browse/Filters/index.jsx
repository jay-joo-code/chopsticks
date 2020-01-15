import React from 'react';
import styled from 'styled-components';
import Price from './Price';

const Container = styled.div`
  margin-top: 2rem;
`;

const Filters = () => {
  return (
    <Container>
      <Price />
    </Container>
  )
};

export default Filters;
