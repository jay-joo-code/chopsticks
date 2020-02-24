import React, { useState } from 'react';
import styled from 'styled-components';
import Badge from 'src/components/common/displays/Badge';
import { orderStateToString, orderStateToActions } from 'src/util/parseOrderState';
import ActionPopup from './ActionPopup';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  & > div {
    margin-bottom: .5rem;
  }
`;

const OrderActions = ({ order, setV, v }) => {
  // popup logic
  const [show, setShow] = useState();
  const [action, setAction] = useState();

  // order action handling
  const actions = orderStateToActions(order.state);
  const handleBadgeClick = (action) => {
    setAction(action);
    if (action === '배송추적' || action === '리뷰쓰기') return;
    setShow(true);
  };

  if (!actions) {
    return <div />;
  }

  return (
    <Container>
      <Badge
        color="secondary"
        size="sm"
        borderRadius="none"
      >
        {orderStateToString(order.state)}
      </Badge>
      {actions.map((action) => (
        <Badge
          color="primary"
          size="sm"
          borderRadius="none"
          type="button"
          inverted
          onClick={() => handleBadgeClick(action)}
        >
          {action}
        </Badge>
      ))}
      <ActionPopup
        show={show}
        setShow={setShow}
        action={action}
        rid={order.bootpay.receipt_id}
        setV={setV}
        v={v}
        order={order}
      />
    </Container>
  );
};

export default OrderActions;
