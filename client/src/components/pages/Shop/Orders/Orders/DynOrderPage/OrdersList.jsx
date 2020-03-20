import React from 'react';
import styled from 'styled-components';
import OrderListCard from './OrderListCard';

const Container = styled.div`

`;

const Header = styled.div`
  display: none;
  
  @media(min-width: ${(props) => props.theme.desktopContentWidth}px) {
    display: block;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
    display: flex;
    align-items: center;
    background: white;
  }
`;

const ColHeader = styled.div`
  display: none;
  
  @media(min-width: ${(props) => props.theme.desktopContentWidth}px) {
    width: ${(props) => props.width};
    display: flex;
    justify-content: center;
    display: block;
  }
`;

const ColText = styled.p`
  display: none;
  
  @media(min-width: ${(props) => props.theme.desktopContentWidth}px) {
    display: block;
    text-align: center;
  }
`;

const OrdersList = ({
  orders, selected, setSelected, v, setV,
}) => {
  const colWidths = ['2rem', '10rem', '5rem', '8rem', '5rem', '12rem', '10rem', '8rem', '2rem'];
  const colNames = ['', '주문번호', '', '상품', '주문일', '주소', '택배사 / 송장번호', '상태변경', ''];

  return (
    <Container>
      <Header>
        {colWidths.map((width, i) => (
          <ColHeader key={Math.random()} width={width}>
            <ColText>{colNames[i]}</ColText>
          </ColHeader>
        ))}
      </Header>
      <div>
        {orders.map((order) => (
          <OrderListCard
            key={order._id}
            order={order}
            colWidths={colWidths}
            selected={selected}
            setSelected={setSelected}
            v={v}
            setV={setV}
          />
        ))}
      </div>
    </Container>
  );
};

export default OrdersList;
