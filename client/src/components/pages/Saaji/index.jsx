import React from 'react';
import styled from 'styled-components';
import Button from 'src/components/common/Button';
import DNS from './dns.bat';

const Container = styled.div`
  min-height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
`;

const Saaji = () => (
  <Container>
    <a href={DNS} download>DNS</a>
  </Container>
);

export default Saaji;
