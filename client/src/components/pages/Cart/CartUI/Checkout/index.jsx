import React from 'react';
import styled from 'styled-components';
import Title from 'src/components/common/fonts/Title';
import theme from 'src/theme';
import DeliveryDetails from './DeliveryDetails';

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
`;

const InnerCont = styled.div`
  width: 100%;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    // width: 30%;
  }
`;

const Checkout = ({ method, setMethod }) => (
  <Container>
    <Title>결제</Title>
    <Inner>
      <InnerCont>
        <DeliveryDetails 
          method={method}
          setMethod={setMethod}
        />
      </InnerCont>
    </Inner>
  </Container>
);

export default Checkout;
