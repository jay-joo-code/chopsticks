import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  margin: 0;
  padding: 1rem;
  border-radius: ${props => props.rounded ? '20px' : '8px'};
  box-shadow: 0 8px 8px 0 rgba(222, 99, 98, 0.2);
  background-color: ${props => props.green ? '#66c088' : '#de6362'};
  background-color: ${props => props.white ? 'white' : ''};
  color: ${props => props.white ? 'black' : 'white'};
  opacity: ${props => props.white ? '.8' : ''};
  font-size: 1rem;
`;

const RedButton = (props) => (
  <Button {...props}>
    {props.children}
  </Button>
);

export default RedButton;
