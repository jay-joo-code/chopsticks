import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  color:#fff;
  background:#dd5850;
  text-align: center;
  line-height: 18px;
  font-size: .7rem;
  right: 0px;
  top: 0px;
  top: ${props => props.top ? `${props.top}px` : ''};
  right: ${props => props.right ? `${props.right}px` : ''};
  cursor: pointer;
  display: ${props => props.text ? 'block' : 'none'};
`;

const Notification = ({ text, top, right, ...rest}) => (
  <Container 
    {...rest}
    top={top}
    right={right}
    text={text}
  >
    {text}
  </Container>
);

export default Notification;
