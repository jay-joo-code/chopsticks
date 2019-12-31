import React from 'react';
import styled from 'styled-components';
import DeleteItem from './DeleteItem';

const Container = styled.div`

`;

const AdminContent = (props) => (
  <Container>
    <DeleteItem {...props} />
  </Container>
);

export default AdminContent;
