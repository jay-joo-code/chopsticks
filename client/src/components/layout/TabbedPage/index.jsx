import React, { useState } from 'react';
import styled from 'styled-components';
import Tab from './Tab';

const Container = styled.div`
  padding: 2rem 0;
`;

const Content = styled.div`
  
`;

const TabbedPage = ({ key, pages }) => {
  const [index, setIndex] = useState(0);
  
  return (
    <Container>
      <Tab
        pages={pages}
        index={index}
        setIndex={setIndex}
      />
      <Content>
        {pages[index].component}
      </Content>
    </Container>
  );
};

export default TabbedPage;
