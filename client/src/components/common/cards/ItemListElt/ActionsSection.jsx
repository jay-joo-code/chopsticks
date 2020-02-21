import React from 'react';
import styled from 'styled-components';
import api from 'src/util/api';
import log from 'src/util/log';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import OrderActions from './OrderActions';

const Cross = styled.p`
  cursor: pointer;
`;

const ActionSection = ({ order, setV, v, user, cartObj, }) => {
  // cart logic
  const handleRemove = () => {
    api.put(`/user/${user._id}/cart/delete/cartobj`, { cartObj })
      .then((res) => {
        fetchSelfAndStore(user._id);
      })
      .catch((e) => {
        log('ERROR delete cartobj from cart', e);
      });
  };
  
  if (!order) return <Cross onClick={handleRemove}>X</Cross>;
  return (
    <OrderActions
      order={order}
      setV={setV}
      v={v}
    />
    )
};

export default ActionSection;
