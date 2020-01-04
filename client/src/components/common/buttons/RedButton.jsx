import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  margin: 0;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 8px 8px 0 rgba(222, 99, 98, 0.2);
  background-color: #de6362;
  color: #fff;
  font-size: 1rem;
`;

const RedButton = (props) => (
  <Button {...props}>
    {props.children}
  </Button>
);

export default RedButton;
