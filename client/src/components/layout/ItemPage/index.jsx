import React from 'react';
import styled from 'styled-components';
import Admin from './Admin';

const Container = styled.div`
  padding: 2rem 0;
  
  @media (min-width: ${(props) => props.theme.desktopContentWidth}px) {
    padding: 3rem 0 2rem 0;
  }
`;

const ContentContainer = styled.div`
  
`;

const ItemPage = (props) => (
  <Container {...props}>
    <Admin />
    <ContentContainer>
      {props.children}
    </ContentContainer>
  </Container>
);

export default ItemPage;
