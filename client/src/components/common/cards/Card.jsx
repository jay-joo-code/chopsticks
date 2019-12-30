import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import dimensions from './dimensions';

const Container = styled.div`
  padding: 2rem 0;
  width: 100%;
  
  @media(min-width: ${theme.desktopContentWidth}px) {
    width: 313px;
    padding: 1rem .5rem;
  }
`;

const Wrapper = styled.div`
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);  
  background-color: white;
  height: ${dimensions.HEIGHT}px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const Card = (props) => (
  <Container key={props._id}>
    <Wrapper onClick={props.onClick}>
      {props.children}
    </Wrapper>
  </Container>
);

export default Card;
