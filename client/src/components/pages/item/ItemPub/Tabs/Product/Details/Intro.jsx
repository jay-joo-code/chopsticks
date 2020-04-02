import React from 'react';
import styled from 'styled-components';
import 'src/styles/Intro.scss';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-line;
  word-break: break-word;
  overflow: hidden;
  width: 100%;
  word-wrap: break-word;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    width: 620px;
  }
`;

const Intro = ({ item }) => (
  <div className="intro">
    <Container>
      <div dangerouslySetInnerHTML={{ __html: item.intro }} />
    </Container>
  </div>
);

export default Intro;
