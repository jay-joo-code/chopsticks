import React from 'react';
import styled from 'styled-components';
import UserData from 'src/components/common/UserData';
import ItemName from './ItemName';

const Container = styled.div`
  margin-bottom: 4rem;
  
  @media (min-width: ${(props) => props.theme.desktopContentWidth}px) {
    margin-bottom: 0;
  }
`;

const UserSection = styled.div`
  padding: .5rem 0;
`;

const TopSection = (props) => (
  <Container>
    <ItemName {...props} />
    <UserSection>
      <UserData user={props.owner} />
    </UserSection>
  </Container>
);

export default TopSection;
