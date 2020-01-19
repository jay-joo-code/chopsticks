import React from 'react';
import styled from 'styled-components';
import 'src/styles/Intro.scss';

const Container = styled.div`

`;

const Intro = ({ item }) => (
  <Container>
    <div dangerouslySetInnerHTML={{ __html: item.intro }} />
  </Container>
);

export default Intro;
