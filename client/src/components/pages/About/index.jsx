import React from 'react';
import styled from 'styled-components';
import Section from './Section';
import OutlinedButton from 'src/components/common/buttons/OutlinedButton';
import { Link } from 'react-router-dom';

const Container = styled.div`

`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8rem;
  
  & > * {
    margin: 0 1rem;
  }
`

const About = () => {
  return (
    <Container>
      <Section
        heading="IT'S NICE TO MEET YOU,"
        headingNext='WE ARE CHOPSTICKS.'
        subheading='About Chopsticks'
        body='Chopsticks is a curated design marketplace for design lovers to buy and sell creative design goods. We open up new opportunities for young designers, makers, artists and brands to the next level and we also bring our consumers opportunities to meet unique products and suggest a more valuable lifestyle.'
      />
      <Section
        heading="WE WANT TO MAKE"
        headingNext='AN IMPACT'
        subheading='Chopticks Story'
        body='Chopsticks began to create a platform to connect with the design lovers around the world, focusing on East Asia’s outstanding and competitive design goods. Through this, we named our service as chopsticks, one of the symbols representing East Asian culture, and aim to create the largest design community in Asia starting from Korea.'
      />
      <ButtonSection>
        <Link to='/browse'>
          <OutlinedButton
          
          >
            Look Around
          </OutlinedButton>
        </Link>
        <Link to='/shop'>
          <OutlinedButton
          
          >
            Open a Shop
          </OutlinedButton>
        </Link>
      </ButtonSection>
    </Container>
  )
};

export default About;
