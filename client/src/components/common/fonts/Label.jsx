import React from 'react';
import styled from 'styled-components';

const Container = styled.label`
  margin-bottom: .5rem;
  font-weight: bold;
  opacity: .9;
`;

const Label = (props) => (
  <Container {...props}>
    {props.children}
  </Container>
);

export default Label;
