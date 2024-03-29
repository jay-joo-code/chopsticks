import React from 'react';
import styled from 'styled-components';
import Itemcard from 'src/components/common/cards/ItemCard';
import Tools from './Tools';

const Container = styled.div`

`;

const SellerItem = ({
  item, onClickPath, v, setV, hasMaxDisplayed
}) => (
  <Container>
    <Itemcard
      item={item}
      onClickPath={onClickPath}
      seller
    />
    <Tools
      item={item}
      v={v}
      setV={setV}
      hasMaxDisplayed={hasMaxDisplayed}
    />
  </Container>
);

export default SellerItem;
