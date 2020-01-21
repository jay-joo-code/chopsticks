import React from 'react';
import styled from 'styled-components';
import 'src/styles/Intro.scss';

const Container = styled.div`

`;

const Intro = ({ item }) => (
  <Container>
    <div className='intro'>
      <div dangerouslySetInnerHTML={{ __html: item.intro }} />
    </div>
  </Container>
);

export default Intro;
