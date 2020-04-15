import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TitledPage from 'src/components/layout/TitledPage';
import axios from 'axios';
import { useSelector } from 'react-redux';
import log from 'src/util/log';

import Header from './Header';
import SellerItemsList from './SellerItemsList';

const Container = styled.div`
  margin-bottom: 2rem;
`;

const Items = () => {
  const [items, setItems] = useState([]);
  const [v, setV] = useState(0);
  const userId = useSelector((state) => state.user._id);
  useEffect(() => {
    axios.get(`/api/item/owner/${userId}`)
      .then((res) => {
        const createdItems = res.data.filter((item) => item.created);
        setItems(createdItems);
      })
      .catch((e) => {
        log('ERROR fetching self items', e);
      });
  }, [userId, v]);

  return (
    <Container>
      <Header items={items} />
      <SellerItemsList
        items={items}
        v={v}
        setV={setV}
      />
    </Container>
  );
};

export default Items;
