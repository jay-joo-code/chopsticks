import React from 'react';
import styled from 'styled-components';
import ItemName from './ItemName';
import Metadata from 'src/components/common/Metadata';
import UserData from 'src/components/common/UserData';

const Container = styled.div`

`;

const UserSection = styled.div`
  padding: 1rem 0;
`

const TopSection = (props) => {
  return (
    <Container>
        <ItemName {...props} />
        <Metadata date={props.createdAt} />
        <UserSection>
          <UserData user={props.owner} />
        </UserSection>
    </Container>
  )
};

export default TopSection;
