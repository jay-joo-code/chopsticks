import React from 'react';
import styled from 'styled-components';
import Title from 'src/components/common/fonts/Title';
import DeliveryDetails from './DeliveryDetails';
import theme from 'src/theme';

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;

const Inner = styled.div`
  width: 100%;
  margin: 1rem 0;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
`

const InnerCont = styled.div`
  width: 100%;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    width: 30%;
  }
`

const Checkout = () => {
  return (
    <Container>
      <Title>결제</Title>
      <Inner>
        <InnerCont>
          <DeliveryDetails />
        </InnerCont>
      </Inner>
    </Container>
  )
};

export default Checkout;
