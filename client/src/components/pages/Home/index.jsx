import React from 'react';
import styled from 'styled-components';
import Banner from './Banner';
import ItemsList from './ItemsList';

const Container = styled.div`

`;

const DefaultComponent = () => (
  <Container>
    <Banner />
    <ItemsList />
  </Container>
);

export default DefaultComponent;
