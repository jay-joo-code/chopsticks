import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from 'src/util/api';
import log from 'src/util/log';
import OrderListCard from 'src/components/common/cards/OrderListCard';

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  display: flex;
  align-items: center;
  background: white;
`

const ColHeader = styled.div`
  width: ${props => props.width};
  display: flex;
  justify-content: center;
`

const DynOrderPageIndex = ({ user, state }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user && state) {
      api.get(`/order/seller/${user._id}?state=${state}`)
        .then((res) => setOrders(res.data))
        .catch((e) => log(`ERROR fetching orders at DynOrderPageIndex`, e))
    }
  }, [state, user])
  
  const colWidths = ['2rem', '10rem', '8rem', '8rem', '8rem', '8rem', '8rem', '8rem', '2rem']
  const colNames = ['', '주문번호', '', '상품', '주문일', '택배사', '송장번호', '상태변경', '']
  
  return (
    <Container>
      <Header>
        {colWidths.map((width, i) => (
          <ColHeader width={width}>
            <p>{colNames[i]}</p>
          </ColHeader>
        ))}
      </Header>
      {orders.map((order) => (
        <OrderListCard
          key={order._id}
          order={order}
          state={state}
          colWidths={colWidths}
        />
      ))}
    </Container>
  )
};

export default DynOrderPageIndex;
