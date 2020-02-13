import React from 'react';
import styled from 'styled-components';
import Title from 'src/components/common/fonts/Title';
import BasicInfoForm from './BasicInfoForm';

const Container = styled.div`
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const BasicInfo = ({ user }) => (
  <Container>
    <Header>
      <Title>기본정보</Title>
    </Header>
    <BasicInfoForm
      user={user}
    />
  </Container>
);

export default BasicInfo;
