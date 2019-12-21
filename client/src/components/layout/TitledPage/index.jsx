import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem 0;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.green};
  font-weight: bold;
  padding: 1rem 0;
`

const Content = styled.div`

`

const TitledPage = (props) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Content>
        {props.children}
      </Content>
    </Container>
  )
};

export default TitledPage;
