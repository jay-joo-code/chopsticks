import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: .5rem .8rem;
  padding: ${(props) => (props.size === 'sm' ? '.2rem .5rem' : '')};
  background-color: white;
  background: ${(props) => (props.inverted ? props.theme[props.color] : '')};
  color: ${(props) => props.theme.primary};
  color: ${(props) => (props.color ? props.theme[props.color] : '')};
  color: ${(props) => (props.inverted ? 'white' : '')};
  cursor: ${(props) => (props.type === 'button' ? 'pointer' : '')};
  display: inline-block;
  font-size: inherit;
  font-size: ${(props) => (props.size === 'sm' ? '.8rem' : '')};
  border-radius: 15px;
  border-radius: ${(props) => (props.borderRadius === 'none' ? '2px' : '')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  border: ${(props) => (props.inverted ? '' : '1px solid')};
  border-color: ${(props) => (props.inverted ? '' : `${(props) => props.theme[props.color]}`)};
  text-align: center;
`;

const Badge = ({
  children, color, inverted, type, size, borderRadius, ...rest
}) => (
  <Container
    {...rest}
    color={color}
    inverted={inverted}
    type={type}
    size={size}
    borderRadius={borderRadius}
  >
    {children}
  </Container>
);

export default Badge;
