import React from 'react';
import styled from 'styled-components';
import TopSection from './TopSection';
import BottomSection from './BottomSection';

const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media(min-width: ${(props) => props.theme.desktopContentWidth}px) {
    padding: 0 0 0 2rem;
    flex-grow: 2;
  }
`;

const Info = (props) => (
  <Container>
    <TopSection {...props} />
    <BottomSection {...props} />
  </Container>
);

export default Info;
