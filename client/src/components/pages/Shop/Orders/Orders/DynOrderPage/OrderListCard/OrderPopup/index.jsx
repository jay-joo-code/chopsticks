import React from 'react';
import styled from 'styled-components';
import DeliveryDetailCard from 'src/components/common/cards/DeliveryDetailCard';
import Popup from 'src/components/common/popups/Popup';
import StateMsg from './StateMsg';

const Container = styled.div`
  padding: 1rem 0;
  max-width: 100%;
  
  @media (min-width: ${(props) => props.theme.DESKTOP_WIDTH}px) {
    padding: 2rem;
  }
`;

const OrderDetails = styled.div`
  margin: 4rem 0 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: ${(props) => (props.font ? props.font : '')};
  margin: .5rem 0;
`;

const Text = styled.p`
  min-width: 40px;
  margin: 0 1rem;
    
  @media (min-width: ${(props) => props.theme.DESKTOP_WIDTH}px) {
    min-width: 100px;
  }
  
  // align
  text-align: ${props => props.align ? props.align : ''};
`

const HL = styled.div`
  width: 100%;
  border-bottom: 1px solid grey;
  margin: 3rem 0;
`;

const OrderPopup = ({ showPopup, setShowPopup, order }) => {
  const closePopup = () => setShowPopup(0);
  const { options, optionsTwo } = order.cartObj.item;
  const { quantity, price, priceNoDeliv } = order.cartObj;
  const idx = order.cartObj.optionsIndex;
  const opts = `${(options[idx[0]] || '')} ${(optionsTwo[idx[1]] || '')}`.trim() || '없음';
  let stateType = '';
  if (order.state.includes('cancel')) stateType = '취소';
  if (order.state.includes('exchange')) stateType = '교환';
  if (order.state.includes('refund')) stateType = '환불';
  const title = stateType ? stateType + '요청' : undefined;
  
  return (
    <Popup
      display={showPopup}
      handleClosePopup={closePopup}
      title={title}
    >
      <Container>
        <StateMsg
          order={order}
          stateType={stateType}
        />
        <DeliveryDetailCard
          {...order.deliv}
        />
        <OrderDetails>
          <Row font="bold">
            <div>
              <Text>{stateType === '교환' && '이전'} 주문정보</Text>
            </div>
            <Row>
              <Text align='center'>옵션</Text>
              <Text align='center'>수량</Text>
              <Text align='right'>가격</Text>
            </Row>
          </Row>
          <Row>
            <div>
              <Text>{order.cartObj.item.name}</Text>
            </div>
            <Row>
              <Text align='center'>{opts}</Text>
              <Text align='center'>{quantity}</Text>
              <Text align='right'>{`${priceNoDeliv.toLocaleString()}원`}</Text>
            </Row>
          </Row>
          <Row>
            <div>
              <Text>배송비</Text>
            </div>
            <Row>
              <Text align='right'>{`${(price - priceNoDeliv).toLocaleString()}원`}</Text>
            </Row>
          </Row>
          <HL />
          <Row>
            <div>
              <Text>총 결제 금액</Text>
            </div>
            <Row>
              <Text align='right'>{`${price.toLocaleString()}원`}</Text>
            </Row>
          </Row>
        </OrderDetails>
      </Container>
    </Popup>
  );
};

export default OrderPopup;
