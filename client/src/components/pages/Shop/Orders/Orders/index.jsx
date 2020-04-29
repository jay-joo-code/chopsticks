import React, { useEffect } from 'react';
import styled from 'styled-components';
import TabbedPage from 'src/components/layout/TabbedPage';
import DynOrderPage from './DynOrderPage';
import { updateDelivState } from 'src/util/helpers';

const Container = styled.div`

`;

const Orders = ({ user }) => {
  const pages = [{
    name: '새주문',
    component: <DynOrderPage user={user} state="new" />,
  }, {
    name: '배송전',
    component: <DynOrderPage user={user} state="pending" />,
  }, {
    name: '배송중',
    component: <DynOrderPage user={user} state="delivering" />,
  }, {
    name: '배송완료',
    component: <DynOrderPage user={user} state="complete" />,
  }, {
    name: '교환건',
    component: <DynOrderPage user={user} state="exchange" />,
  }, {
    name: '환불건',
    component: <DynOrderPage user={user} state="refund" />,
  }, {
    name: '취소건',
    component: <DynOrderPage user={user} state="cancel" />,
  }];

  // check if "deliving" -> "complete" updates available
  useEffect(() => {
    updateDelivState(user._id, 'seller');
  }, [])
  
  return (
    <Container>
      <TabbedPage
        pages={pages}
      />
    </Container>
  );
};

export default Orders;
