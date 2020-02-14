import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 2rem 0;
  width: 100%;
`;

const Wrapper = styled.div`
  border-radius: 5px;
  overflow: hidden;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);  
  background-color: white;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Card = (props) => (
  <Container>
    <Wrapper onClick={props.onClick}>
      {props.children}
    </Wrapper>
  </Container>
);

export default Card;
