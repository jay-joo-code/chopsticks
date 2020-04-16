import React from 'react';
import styled from 'styled-components';
import HeadingRaw from 'src/components/common/fonts/Heading';
import CompanyInfoForm from './CompanyInfoForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled(HeadingRaw)`
  margin-top: 4rem;
`

const CompanyInfo = ({ user }) => {
  return (
    <Container>
      <Heading>사업자 정보</Heading>
      <CompanyInfoForm
        user={user}
      />
    </Container>
  )
};

export default CompanyInfo;
