import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  width: 500px;
  height: 200vh;
  background-color: grey;
`

const SidebarArea = styled.div`
  width: 100px;
  height: 100px;
  background-color: grey;
  position: sticky;
  top: 0;
`

const Sidebar = styled.div`
  
  background-color: red;
  height: 100px;
  width: 100px;
`

const Reviews = () => (
  <Container>
    <Content>
    </Content>
    <SidebarArea>
      
    </SidebarArea>
  </Container>
);

export default Reviews;
