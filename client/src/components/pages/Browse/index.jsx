import React from 'react';
import styled from 'styled-components';
import Toolbar from './Toolbar';
import ItemsList from './ItemsList';

const Container = styled.div`

`;

const Browse = () => {
  return (
    <Container>
      <Toolbar />
      <ItemsList />
    </Container>
  )
};

export default Browse;
