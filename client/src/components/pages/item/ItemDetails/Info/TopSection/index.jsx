import React from 'react';
import styled from 'styled-components';
import ItemName from './ItemName';
import Metadata from 'src/components/common/Metadata';
import UserData from 'src/components/common/UserData';

const Container = styled.div`

`;

const TopSection = (props) => {
  return (
    <Container>
        <ItemName name={props.name} />
        <Metadata date={props.createdAt} />
        <UserData {...props} />
    </Container>
  )
};

export default TopSection;
