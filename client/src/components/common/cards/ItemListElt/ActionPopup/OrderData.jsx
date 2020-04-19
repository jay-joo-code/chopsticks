import React from 'react';
import styled from 'styled-components';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`
  width: 100%;
`;

const Bold = styled(Body)`
  font-weight: bold;
`

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
`

const Col = styled.div`

`

const Img = styled.img`
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
  height: 6rem;
  width: 6rem;
  margin-right: 1rem;
`

const OrderData = ({ order }) => {
  const { item, quantity, price, optString } = order.cartObj;
  
  
  return (
    <Container>
      <Bold>주문날짜: {order.createdAt.slice(0, 10)}</Bold>
      <Row>
        <Img src={item.image} />
        <Col>
          <Body>{optString || ''}</Body>
          <Body>{quantity}개, {price}원</Body>
        </Col>
      </Row>
      <Row>
        <Body color='danger'>@{order.seller.shop.title}</Body>
      </Row>
    </Container>
  )
};

export default OrderData;
