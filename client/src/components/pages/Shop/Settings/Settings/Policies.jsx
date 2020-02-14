import React from 'react';
import styled from 'styled-components';
import Title from 'src/components/common/fonts/Title';
import PoliciesForm from './PoliciesForm';

const Container = styled.div`

`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin: 4rem 0 2rem 0;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const RowTitle = styled.h3`
  font-size: 1.2rem;
`

const Policies = ({ user }) => {
  
  return (
    <Container>
      <Header>
        <Title>배송 / 정책</Title>
      </Header>
      <PoliciesForm 
        user={user}
      />
    </Container>
  )
};

export default Policies;
