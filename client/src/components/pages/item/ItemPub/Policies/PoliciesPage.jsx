import React from 'react';
import styled from 'styled-components';
import Subheading from 'src/components/common/fonts/Subheading';
import Body from 'src/components/common/fonts/Body';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  width: 70%;
`;

const Section = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid rgba(200, 200, 200);
`

const PoliciesPage = ({ policies }) => {
  const { delivery, refund, etc } = policies;
  
  return (
    <Wrapper>
    <Container>
      <Section>
        <Subheading>제작 / 배송</Subheading>
        <Body>{delivery}</Body>
      </Section>
      <Section>
        <Subheading>환불 / 교환</Subheading>
        <Body>{refund}</Body>
      </Section>
      <Section>
        <Subheading>추가 정보</Subheading>
        <Body>{etc}</Body>
      </Section>
    </Container>
    </Wrapper>
  )
};

export default PoliciesPage;
