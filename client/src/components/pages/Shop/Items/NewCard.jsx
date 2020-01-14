import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';

const Container = styled.div`
  margin: 0 1rem 0 0;
  height: ${theme.CARD_WIDTH}px;
  width: ${theme.CARD_WIDTH}px;
`;

const Wrapper = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 3rem;
  font-weight: bold;
  opacity: .8;
`

const NewCard = () => {
  return (
    <Container>
      <Wrapper>
        +
      </Wrapper>
    </Container>
  )
};

export default NewCard;
