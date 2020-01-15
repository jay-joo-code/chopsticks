import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import log from 'src/util/log';
import ItemsList from 'src/components/layout/ItemsList';

const Container = styled.div`

`;

const ItemsListComp = () => {
  const { search } = useLocation();
  const [items, setItems] = useState([]);
  useEffect(() => {
    log('search change', search)
    axios.get(`/api/item/filtered${search}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((e) => {
        log(`ERROR fetch filtered items`, e);
      })
  }, [search])
  return (
    <Container>
      <ItemsList items={items} />
    </Container>
  )
};

export default ItemsListComp;
