import React from 'react';
import styled from 'styled-components';
import ItemCard from 'src/components/common/cards/ItemCard';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;

const ItemsList = ({ items }) => {
  const displayItems = items.filter((item) => item.display);
  return (
    <Container>
      <Wrapper>
        {displayItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default ItemsList;
