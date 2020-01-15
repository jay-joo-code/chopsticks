import React from 'react';
import styled from 'styled-components';
import Filters from './Filters';
import ItemsList from './ItemsList';

const Container = styled.div`

`;

const Browse = () => {
  return (
    <Container>
      <Filters />
      <ItemsList />
    </Container>
  )
};

export default Browse;
