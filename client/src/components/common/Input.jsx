import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: none;
  border-bottom: solid 1px rgba(0, 0, 0, .5);
  background-color: inherit;
  font-family: inherit;
  font-size: inherit;
`;

const Input = (props) => (
  <StyledInput {...props} />
);

export default Input;
