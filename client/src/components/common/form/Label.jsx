import React from 'react';
import styled from 'styled-components';

const Container = styled.label`
`;

const Label = (props) => (
  <Container {...props}>
    {props.children}
  </Container>
);

export default Label;
