import React from 'react';
import styled from 'styled-components';
import Section from './Section';

const Container = styled.div`

`;

const About = () => {
  return (
    <Container>
      <Section
        title='About Chopsticks'
        body='test body'
      />
    </Container>
  )
};

export default About;
