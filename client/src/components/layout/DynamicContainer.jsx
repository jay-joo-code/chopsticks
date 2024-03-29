import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';

const { desktopContentWidth } = theme;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 90%;
  max-width: 90%;
  
  @media(min-width: ${desktopContentWidth}px) {
    width: ${desktopContentWidth}px;
  }
`;

const DynamicContainer = (props) => (
  <Wrapper {...props}>
    <Container>
      {props.children}
    </Container>
  </Wrapper>
);

export default DynamicContainer;
