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
  
  // size: sm
  font-size: ${props => props.size === 'sm' ? '.7rem' : ''};
  padding: ${props => props.size === 'sm' ? '.3rem .5rem' : ''};
  
  // inverted
  color: ${(props) => (props.inverted ? props.theme[props.color] || 'black' : '')};
  background: ${props => props.inverted ? 'white' : ''};
`;

const Btn = ({
  children, color, disabled, size, inverted, ...rest
}) => (
  <Button
    color={color}
    disabled={disabled}
    {...rest}
    size={size}
    inverted={inverted}
  >
    {children}
  </Button>
);

export default Btn;
