import React from 'react';
import styled from 'styled-components';
import Filters from './Filters';
import SortBy from './SortBy';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  padding: 0 1rem;
`;

const Toolbar = () => {
  return (
    <Container>
      <Filters />
      <SortBy />
    </Container>
  )
};

export default Toolbar;
