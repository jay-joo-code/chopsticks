import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 1rem 0;
  width: ${props => props.width ? `${props.width}%` : ''};
`;

const InputCont = (props) => {
  return (
    <Container {...props} >
      {props.children}
    </Container>
  )
};

export default InputCont;
