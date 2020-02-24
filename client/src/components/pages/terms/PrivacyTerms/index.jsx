import React from 'react';
import styled from 'styled-components';
import Title from 'src/components/common/fonts/Title';
import p1 from 'src/assets/images/policies/privacy/개인정보 처리방침.png';
import p2 from 'src/assets/images/policies/privacy/개인정보 처리방침-2.png';
import p3 from 'src/assets/images/policies/privacy/개인정보 처리방침-3.png';
import p4 from 'src/assets/images/policies/privacy/개인정보 처리방침-4.png';
import p5 from 'src/assets/images/policies/privacy/개인정보 처리방침-5.png';
import p6 from 'src/assets/images/policies/privacy/개인정보 처리방침-6.png';
import p7 from 'src/assets/images/policies/privacy/개인정보 처리방침-7.png';

const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  margin: 2rem 0;
`

const PrivacyTerms = () => (
  <Container>
    <Title>개인정보 취급방침</Title>
    <Img src={p1} />
    <Img src={p2} />
    <Img src={p3} />
    <Img src={p4} />
    <Img src={p5} />
    <Img src={p6} />
    <Img src={p7} />
  </Container>
);

export default PrivacyTerms;
