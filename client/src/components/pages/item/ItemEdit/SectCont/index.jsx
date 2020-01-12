import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 4rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const SectCont = (props) => (
  <Container {...props}>
    {props.children}
  </Container>
);

export default SectCont;
