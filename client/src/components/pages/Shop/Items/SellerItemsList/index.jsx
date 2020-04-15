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
  const hasMaxDisplayed = items.filter((item) => item.display).length >= 7;
  
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
          hasMaxDisplayed={hasMaxDisplayed}
        />
      ))}
    </Container>
  )
};

export default SellerItemsList;
