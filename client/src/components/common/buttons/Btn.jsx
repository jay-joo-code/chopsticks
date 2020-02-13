import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  margin: 0;
  padding: 1rem;
  border-radius: ${(props) => (props.rounded ? '20px' : '8px')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  background-color: ${(props) => (props.color ? props.theme[props.color] : props.theme.primary)};
  color: white;
  font-size: 1rem;
`;

const RedButton = ({ children, color, ...rest }) => (
  <Button
    color={color}
    {...rest}
  >
    {children}
  </Button>
);

export default RedButton;
