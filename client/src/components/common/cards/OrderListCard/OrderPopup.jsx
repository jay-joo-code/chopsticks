import React from 'react';
import styled from 'styled-components';
import DeliveryDetailCard from 'src/components/common/cards/DeliveryDetailCard';
import Popup from 'src/components/common/popups/Popup';

const Container = styled.div`
  padding: 1rem 0;
  max-width: 100%;
  
  @media (min-width: ${props => props.theme.DESKTOP_WIDTH}px) {
    padding: 4rem;
  }
`

const OrderDetails = styled.div`
  margin: 4rem 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: ${props => props.font ? props.font : ''};
  margin: .5rem 0;
  
  & > p {
    min-width: 40px;
    
    @media (min-width: ${props => props.theme.DESKTOP_WIDTH}px) {
      min-width: 100px;
    }
  }
` 

const HL = styled.div`
  width: 100%;
  border-bottom: 1px solid grey;
  margin: 1rem 0;
`

const OrderPopup = ({ showPopup, setShowPopup, order }) => {
  const openPopup = () => setShowPopup(1);
  const closePopup = () => setShowPopup(0);
  const { options, optionsTwo } = order.cartObj.item;
  const { quantity, price, priceNoDeliv } = order.cartObj;
  const idx = order.cartObj.optionsIndex;
  let opts = `${(options[idx[0]] || '')} ${(optionsTwo[idx[1]] || '')}`.trim() || '없음';
  
  return (
      <Popup
      display={showPopup}
      handleClosePopup={closePopup}
    >
      <Container>
        <DeliveryDetailCard
          {...order.deliv}
        />
        <OrderDetails>
          <Row font='bold'>
            <div>
              <p>주문정보</p>
            </div>
            <Row>
              <p>옵션</p>
              <p>수량</p>
              <p>가격</p>
            </Row>
          </Row>
          <Row>
            <div>
              <p>{order.cartObj.item.name}</p>
            </div>
            <Row>
              <p>{opts}</p>
              <p>{quantity}</p>
              <p>{`${priceNoDeliv.toLocaleString()}원`}</p>
            </Row>
          </Row>
          <Row>
            <div>
              <p>배송비</p>
            </div>
            <Row>
              <p>{`${(price - priceNoDeliv).toLocaleString()}원`}</p>
            </Row>
          </Row>
          <HL />
          <Row>
            <div>
              <p>총 결제 금액</p>
            </div>
            <Row>
              <p>{`${price.toLocaleString()}원`}</p>
            </Row>
          </Row>
        </OrderDetails>
      </Container>
    </Popup>
  )
};

export default OrderPopup;
