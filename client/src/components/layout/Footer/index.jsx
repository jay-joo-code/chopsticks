import React from 'react';
import styled from 'styled-components';
import TopFooter from './TopFooter';
import BottomFooter from './BottomFooter';

const Container = styled.div`
  
`;

const Footer = () => {
  return (
    <Container>
      <TopFooter />
      <BottomFooter />
    </Container>
  )
};

export default Footer;
