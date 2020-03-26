import React from 'react';
import styled from 'styled-components';
import BodyRaw from 'src/components/common/fonts/Body';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 8rem 0;
`;

const Content = styled.div`
  
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`

const Body = styled(BodyRaw)`
  text-align: center;
`

const Section = ({ title, body }) => {
  return (
    <Container>
      <Content>
        <Title>"{title}"</Title>
        <Body>{body}</Body>
      </Content>
    </Container>
  )
};

export default Section;
