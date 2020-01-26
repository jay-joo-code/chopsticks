import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RedButton from 'src/components/common/buttons/RedButton';
import log from 'src/util/log';
import theme from 'src/theme';
import getTotalPrice from 'src/util/calculation/getTotalPrice';
import cartTransaction from 'src/util/bootpay/cartTransaction';
import { useSelector } from 'react-redux';
import FixedBottomPanel from 'src/components/layout/FixedBottomPanel';

const DesktopDisplay = styled.div`
  display: none;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    display: block;
  }
`

const MobileDisplay = styled.div`
  display: block;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    display: none;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  min-width: 300px;
  position: sticky;
  top: 20px;
`;

const Title = styled.h3`
  color: ${props => props.theme.green};
  font-weight: bold;
  font-size: 1.5rem;
`

const PriceCont = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  width: 100%;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: .5rem 0;
`

const Type = styled.p`
  opacity: .7;
`

const TotalCont = styled.div`
  margin: 2rem 0;
  width: 100%;
`

const Checkout = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDelivery, setTotalDelivery] = useState(0);
  useEffect(() => {
    let priceAccum = 0, deliveryAccum = 0;
    cart.map((cartObj) => {
      priceAccum += getTotalPrice(cartObj);
      deliveryAccum += cartObj.item.deliveryCost;
    })
    setTotalPrice(priceAccum);
    setTotalDelivery(deliveryAccum);
  }, [cart])
  
  const user = useSelector((state) => state.user);
  const initTransaction = () => {
    if (!user || !user._id) return;
    cartTransaction(user._id);
  }
  
  const mobileBuyBtn = <RedButton green rounded onClick={initTransaction}>결제하기</RedButton>
  
  return (
    <div>
    <MobileDisplay>
      <FixedBottomPanel
        text={`카트 상품 (${cart.length})`}
        supportText={`${totalPrice.toLocaleString()}원`}
        button={mobileBuyBtn}
      />
    </MobileDisplay>
    <DesktopDisplay>
      <Container>
        <Title>주문정보</Title>
        <PriceCont>
          <Row>
            <Type>상품금액</Type>
            <p>{`${totalPrice.toLocaleString()}원`}</p>
          </Row>
          <Row>
            <Type>배송비</Type>
            <p>{`${totalDelivery.toLocaleString()}원`}</p>
          </Row>
        </PriceCont>
        <TotalCont>
          <Row>
            <Type>총 결제 금액</Type>
            <p>{`${(totalPrice + totalDelivery).toLocaleString()}원`}</p>
          </Row>
        </TotalCont>
        <RedButton onClick={initTransaction} green>결제하기</RedButton>
      </Container>
    </DesktopDisplay>
    </div>
  )
};

export default Checkout;
