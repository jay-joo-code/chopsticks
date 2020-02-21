import React from 'react';
import styled from 'styled-components';
import Title from 'src/components/common/fonts/Title';


const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PrivacyTerms = () => (
  <Container>
    <Title>개인정보 취급방침</Title>

  </Container>
);

export default PrivacyTerms;
