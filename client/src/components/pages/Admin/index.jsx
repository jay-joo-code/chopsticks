import React from 'react';
import styled from 'styled-components';
import TabbedPage from 'src/components/layout/TabbedPage';

import AdminUsers from './AdminUsers';
import AdminTransactions from './AdminTransactions';
import AdminShops from './AdminShops';
import AdminOrders from './AdminOrders';

const Container = styled.div`

`;

const Admin = () => {
  const pages = [{
    name: '회원관리',
    component: <AdminUsers />
  }, {
    name: '샵 관리',
    component: <AdminShops />
  }, {
    name: '주문관리',
    component: <AdminOrders />
  }, {
    name: '정산관리',
    component: <AdminTransactions />
  }, ]
  
  return (
    <Container>
      <TabbedPage
        pages={pages}
      />
    </Container>
  )
};

export default Admin;
