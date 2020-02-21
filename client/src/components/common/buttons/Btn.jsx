import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  margin: 0;
  padding: .5rem .8rem;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  background-color: ${(props) => (props.color ? props.theme[props.color] : props.theme.primary)};
  color: white;
  font-size: 1rem;
  opacity: ${(props) => (props.disabled ? '.4' : '')};
`;

const RedButton = ({
  children, color, disabled, ...rest
}) => (
  <Button
    color={color}
    disabled={disabled}
    {...rest}
  >
    {children}
  </Button>
);

export default RedButton;
