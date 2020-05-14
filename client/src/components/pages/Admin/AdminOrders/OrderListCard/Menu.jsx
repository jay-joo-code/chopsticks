import React, { useState } from 'react';
import styled from 'styled-components';
import api from 'src/util/api';
import log from 'src/util/log';

const MenuContainer = styled.div`
  position: absolute;
  right: -4.5rem;
  top: 0;
  width: 4rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuOpt = styled.button`
  font-size: .7rem;
  margin: .3rem 0;
  background: inherit;
`;

const Menu = ({
  order, setV, v, showMenu,
}) => {
  const canCancel = order.state === 'pending' || order.state === 'delivering';
  const handleCancel = () => {
    api.post(`/order/${order.bootpay.receipt_id}/cancel`)
      .then(() => setV(v + 1))
      .catch((e) => log('ERROR OrderListCardIndex handleCancel', e));
  };

  if (!showMenu) return <div />;

  return (
    <MenuContainer>
      {canCancel && (
      <MenuOpt
        type="button"
        onClick={handleCancel}
      >
취소
      </MenuOpt>
      )}
      <MenuOpt
        type="button"
      >
주문내역
      </MenuOpt>
    </MenuContainer>
  );
};

export default Menu;
