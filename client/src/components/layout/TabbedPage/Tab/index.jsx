import React from 'react';
import styled from 'styled-components';
import TabElt from './TabElt';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
  display: flex;
`

const Tab = (props) => {
  const { pages, index, setIndex } = props;
  const handleTabClick = (i) => {
    setIndex(i);
  }
  return (
    <Container>
    <Wrapper>
      {pages.map((page, i) => (
        <TabElt 
          key={page.name} 
          on={index === i ? 1 : 0}
          page={page} 
          onClick={() => handleTabClick(i)}
        />
      ))}
    </Wrapper>
    </Container>
  )
};

export default Tab;
