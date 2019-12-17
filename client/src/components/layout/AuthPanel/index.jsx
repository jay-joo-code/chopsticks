import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';

const Wrapper = styled.div`
  min-height: 70vh;
  //background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: ${theme.md}px) {
    padding: 2rem 0;
  }
`;

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .15);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.theme.green};
`;

const HoriBar = styled.div`
  margin: 2rem 0;
  border-bottom: 3px solid rgba(0, 0, 0, .6);
  width: 5rem;
`;

const Children = styled.div`

`;

const AuthPanel = (props) => (
  <Wrapper {...props}>
    <Container>
      <Title>
        {props.title || 'Title'}
      </Title>
      <HoriBar />
      <Children>
        {props.children}
      </Children>
    </Container>
  </Wrapper>
);

export default AuthPanel;
