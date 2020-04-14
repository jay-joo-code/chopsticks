import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import api from 'src/util/api';
import log from 'src/util/log';
import RevenueByMonth from './RevenueByMonth';
import HeadingRaw from 'src/components/common/fonts/Heading';
import AccountForm from './AccountForm';

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    width: 40%;
  }
`

const Heading = styled(HeadingRaw)`
  margin-bottom: 1rem;
`

const TransactionsIndex = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  useEffect(() => {
    if (user) {
      api.get(`/order/seller/${user._id}?monthIndex=${monthIndex}&state=complete`)
        .then((res) => setOrders(res.data))
        .catch((e) => log('ERROR fetch seller order data', e));
    }
  }, [monthIndex, user]);

  if (!user) return <div />;
  
  return (
    <Container>
      <Content>
        <Heading>내 계좌</Heading>
        <AccountForm
          user={user}
        />
        <RevenueByMonth
          orders={orders}
          monthIndex={monthIndex}
          setMonthIndex={setMonthIndex}
        />
      </Content>
    </Container>
  );
};

export default TransactionsIndex;
