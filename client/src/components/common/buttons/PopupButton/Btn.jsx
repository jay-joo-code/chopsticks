import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  cursor: pointer;
  text-align: center;
  border: 1px solid rgb(176, 176, 176);
  outline: currentcolor none medium;
  margin: 0px;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  color: rgb(34, 34, 34);
  position: relative;
  padding: 1rem 2rem;
  font-size: 1rem;
  line-height: 2rem;
`;

const Btn = ({ children, ...rest}) => {
  return (
    <Container {...rest}>
      {children}
    </Container>
  )
};

export default Btn;
