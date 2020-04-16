import React from 'react';
import styled from 'styled-components';
import BodyRaw from 'src/components/common/fonts/Body';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 8rem 0;
`;

const Content = styled.div`
  width: 100%;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    max-width: 700px;
  }
`

const Heading = styled.h2`
  font-size: 2rem;
  text-align: center;
  line-height: 1.2;
`

const Subheading = styled(BodyRaw)`
  text-align: center;
  font-weight: bold;
  margin: 4rem 0 1rem 0;
  font-size: 1.5rem;
`

const Body = styled(BodyRaw)`
  text-align: center;
  font-size: 1.2rem;
`

const Section = ({ heading, headingNext, subheading, body }) => {
  return (
    <Container>
      <Content>
        <Heading>{heading}</Heading>
        <Heading>{headingNext}</Heading>
        <Subheading>"{subheading}"</Subheading>
        <Body>{body}</Body>
      </Content>
    </Container>
  )
};

export default Section;
