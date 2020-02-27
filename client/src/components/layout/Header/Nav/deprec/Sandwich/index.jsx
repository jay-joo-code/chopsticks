import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
`;

const Bar = styled.div`
  width: 20px;
  border-bottom: 2.5px solid rgba(0, 0, 0, .6);
  margin-bottom: 4px;
`;

const Sandwich = (props) => (
  <Container {...props}>
    <Bar />
    <Bar />
    <Bar />
  </Container>
);

export default Sandwich;
