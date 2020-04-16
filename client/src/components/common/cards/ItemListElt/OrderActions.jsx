import React, { useState } from 'react';
import styled from 'styled-components';
import Badge from 'src/components/common/displays/Badge';
import { orderStateToString, orderStateToActions } from 'src/util/parseOrderState';
import ActionPopup from './ActionPopup';
import DelivPopup from 'src/components/common/popups/DelivPopup';

import trackerUrl from 'src/util/path/trackerUrl';
import axios from 'axios';
import log from 'src/util/log';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  & > div {
    margin-bottom: .5rem;
  }
`;

const OrderActions = ({ order, setV, v }) => {
  const [show, setShow] = useState();
  const [action, setAction] = useState();
  
  const [showDelivPopup, setShowDelivPopup] = useState(false);
  const [delivdata, setDelivData] = useState();  

  const actions = orderStateToActions(order.state);
  const handleBadgeClick = (newAction) => {
    setAction(newAction);
    if (newAction === '리뷰쓰기') return;
    if (newAction === '배송추적') {
      // fetch data
      axios.get(trackerUrl(order))
        .then((res) => {
          setDelivData(res.data);
          setShowDelivPopup(true);
        })
        .catch((e) => {
          log(`ERROR OrderActions`, e)
        })
      return;
    }
    setShow(true);
  };

  return (
    <Container>
      <Badge
        color="secondary"
        size="sm"
        borderRadius="none"
      >
        {orderStateToString(order.state)}
      </Badge>
      {actions && actions.map((action) => (
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
        rid={order.bootpay && order.bootpay.receipt_id}
        setV={setV}
        v={v}
        order={order}
      />
      <DelivPopup
        show={showDelivPopup}
        setShow={setShowDelivPopup}
        data={delivdata}
        company={order.deliv.company}
      />
    </Container>
  );
};

export default OrderActions;
