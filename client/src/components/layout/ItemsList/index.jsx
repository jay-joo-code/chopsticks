import React from 'react';
import styled from 'styled-components';
import ItemCard from 'src/components/common/cards/ItemCard';

const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

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
