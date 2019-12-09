import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding-left: 20px;
`;

const Bar = styled.div`
    width: 2rem;
    margin-bottom: .5rem;
    border-bottom: solid 2px rgba(0, 0, 0, .6);
`;

const Menu = () => (
  <Container>
    <Bar />
    <Bar />
    <Bar />
  </Container>
);

export default Menu;
