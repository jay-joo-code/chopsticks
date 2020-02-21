import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from 'src/util/api';
import { useSelector } from 'react-redux';
import ItemListElt from 'src/components/common/cards/ItemListElt';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 4rem 0;
`;

const Container = styled.div`
  width: 60%;
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [v, setV] = useState(1);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      // fetch orders
      api.get(`/order/buyer/${user._id}`)
        .then((res) => setOrders(res.data))
        .catch((e) => {});
    }
  }, [v]);

  const [selectedItemId, setSelectedItemId] = useState([]);

  return (
    <Wrapper>
      <Container>
        {orders.map((order) => (
          <ItemListElt
            key={order._id}
            cartObj={order.cartObj}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            order={order}
            setV={setV}
            v={v}
          />
        ))}
      </Container>
    </Wrapper>
  );
};

export default Orders;
