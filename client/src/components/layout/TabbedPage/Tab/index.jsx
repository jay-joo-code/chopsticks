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
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
`;

const Tab = (props) => {
  const { pages, index, setIndex, tabWidth } = props;
  const handleTabClick = (i) => {
    setIndex(i);
  };
  return (
    <Container>
      <Wrapper>
        {pages.map((page, i) => (
          <TabElt
            key={page.name}
            on={index === i ? 1 : 0}
            page={page}
            tabWidth={tabWidth}
            onClick={() => handleTabClick(i)}
          />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Tab;
