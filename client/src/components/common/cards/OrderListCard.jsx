import React from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  background: white;
  margin: .5rem 0 0 0;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: .9;
  width: ${props => props.width};
  overflow: hidden;
  white-space: initial;
`

const Text = styled.p`
  font-size: ${props => props.size === 'sm' ? '.6rem' : '.8rem'};
  line-height: 1rem;
`

const Img = styled.img`
  object-fit: cover;
  height: 3rem;
  width: 3rem;
`

const OrderListCard = ({ order, state, colWidths }) => {
  const { image, images, primaryImageIndex, name, options, optionsTwo } = order.cartObj.item;
  const imgSrc = image || images[primaryImageIndex];
  const idx = order.cartObj.optionsIndex;
  let opts = `${(options[idx[0]] || '')} ${(optionsTwo[idx[1]] || '')}`.trim() || '없음';
  const orderDesc = `수량 ${order.cartObj.quantity}, 옵션 ${opts}`;
  const date = new Date(order.createdAt).toLocaleDateString('ko-KR')
  return (
    <Container>
      <Col width={colWidths[0]}>
        
      </Col>
      <Col width={colWidths[1]}>
        <Text size='sm'>{order.bootpay.receipt_id}</Text>
        <Text>{order.deliv.recipient}</Text>
      </Col>
      <Col width={colWidths[2]}>
        <Img src={imgSrc} />
      </Col>
      <Col width={colWidths[3]}>
        <Text>{name}</Text>
        <Text size='sm'>{orderDesc}</Text>
        <Text>{`${order.cartObj.price.toLocaleString()}원`}</Text>
      </Col>
      <Col width={colWidths[4]}>
        <Text>{date}</Text>
      </Col>
      <Col width={colWidths[5]}>
        
      </Col>
      <Col width={colWidths[6]}>
        
      </Col>
      <Col width={colWidths[7]}>
        <Btn 
          type='button'
          color='primary'
        >확인</Btn>
      </Col>
      <Col width={colWidths[8]}>
        
      </Col>
    </Container>
  )
};

export default OrderListCard;
