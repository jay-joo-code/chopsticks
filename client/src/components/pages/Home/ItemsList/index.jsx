import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ItemCard from 'src/components/common/cards/ItemCard';
import axios from 'axios';
import log from 'src/util/log';

const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-wrap: wrap;
`;

const ItemsList = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get('/api/item')
      .then((res) => {
        setItems(res.data);
      })
      .catch((e) => {
        log('ERROR fetching items at home', e);
      });
  }, []);
  return (
    <Container>
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </Container>
  );
};

export default ItemsList;
