import React from 'react';
import styled from 'styled-components';
import SellerItem from './SellerItem';
import NewCard from './NewCard';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const SellerItemsList = ({ items, v, setV }) => {
  return (
    <Container>
      <NewCard />
      {items.map((item) => (
        <SellerItem
          key={item._id}
          item={item}
          onClickPath={`/item/${item._id}/edit`}
          v={v}
          setV={setV}
        />
      ))}
    </Container>
  )
};

export default SellerItemsList;
