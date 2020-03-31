import React from 'react';
import styled from 'styled-components';
import DynamicContainer from 'src/components/layout/DynamicContainer';
import SubheadingRaw from 'src/components/common/fonts/Subheading';
import Body from 'src/components/common/fonts/Body';
import { Link } from 'react-router-dom';
import useCategories from 'src/util/hooks/useCategories';

import {ReactComponent as LogoRaw } from 'src/assets/svgs/logo.svg';
import {ReactComponent as InstragramRaw } from 'src/assets/svgs/instagram.svg';

const Container = styled.div`
  padding: 2rem;
  border-top: 1px solid rgba(0, 0, 0, .1);
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`;

const Logo = styled(LogoRaw)`
  height: 5rem;
  width: 5rem;
`

const Instragram = styled(InstragramRaw)`
  
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    align-items: flex-start;
  }
`

const Subheading = styled(SubheadingRaw)`
  font-size: .8rem;
  opacity: .9;
  margin-bottom: .5rem !important;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  & > * {
    // margin-bottom: .5rem !important;
  }
  
  // spaced
  & > * {
    margin: ${props => props.spaced ? '0 1rem' : ''};
  }
  
  // center
  align-items: ${props => props.center ? 'center' : ''};
`

const StyledLink = styled(Link)`
  margin-bottom: .2rem;
  
  & > p {
    font-size: .8rem;
  }
`

const TopFooter = () => {
  const categories = useCategories();

  return (
    <Container>
      <DynamicContainer>
        <Row>
          <Link to='/'>
            <Logo />
          </Link>
          <Col center>
            <Subheading>follow us</Subheading>
            <a target="_blank" 
              rel="noopener noreferrer" 
              href="https://www.instagram.com/chopsticks.market/"
            >
              <Instragram />
            </a>
          </Col>
          <Col>
            <Row>
              <Col spaced>
                <Subheading>About</Subheading>
                <StyledLink to='/about'>
                  <Body>About Chopsticks</Body>
                </StyledLink>
                <StyledLink to='/contact'>
                  <Body>Contact Us</Body>
                </StyledLink>
              </Col>
              <Col spaced>
                <Subheading>Help & Policies</Subheading>
                <StyledLink to='/terms/use'>
                  <Body>Terms of Use</Body>
                </StyledLink>
                <StyledLink to='/terms/privacy'>
                  <Body>Privacy Policy</Body>
                </StyledLink>
              </Col>
              <Col spaced>
                <Subheading>Category</Subheading>
                {categories && categories.map((cat) => (
                  <StyledLink to={`/browse?category=${cat.name}`}>
                    <Body key={cat.name}>{cat.korean}</Body>
                  </StyledLink>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </DynamicContainer>
    </Container>
  )
};

export default TopFooter;
