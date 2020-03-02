import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: .8;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const RoundBtn = ({ children, ...rest }) => {
  return (
    <Btn 
      {...rest}
      type='button'
    >
      {children}
    </Btn>
  )
};

export default RoundBtn;
