import React from 'react';
import styled from 'styled-components';
import Subheading from 'src/components/common/fonts/Subheading';
import Body from 'src/components/common/fonts/Body';
import { initDelivery, initRefund } from 'src/constants';

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
  
  & > p {
    margin: .5rem 0;
  }
`

const PoliciesPage = ({ item }) => {
  const policies = item.owner.shop.policies;
  const { deliveryCost, processingMin, processingMax, deliveryMin, deliveryMax } = item;
  
  const delivery = (policies && policies.delivery) || initDelivery;
  const refund = (policies && policies.refund) || initRefund;
  const etc = policies && policies.etc;
  
  return (
    <Wrapper>
    <Container>
      <Section>
        <Subheading>제작 / 배송</Subheading>
        <Body>{`제작기간: ${processingMin} ~ ${processingMax}`}</Body>
        <Body>{`배송기간: ${deliveryMin} ~ ${deliveryMax}`}</Body>
        <Body>{`배송비: ${deliveryCost}`}</Body>
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
