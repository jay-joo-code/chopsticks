import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewCard from 'src/components/common/cards/NewCard';
import TitledPage from 'src/components/layout/TitledPage';
import axios from 'axios';
import { useSelector } from 'react-redux';
import log from 'src/util/log';
import Itemcard from 'src/components/common/cards/ItemCard';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Items = () => {
  const [items, setItems] = useState([]);
  const userId = useSelector((state) => state.user._id);
  useEffect(() => {
    axios.get(`/api/item?owner=${userId}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((e) => {
        log('ERROR fetching self items', e);
      });
  }, [userId]);

  return (
    <TitledPage title="상품">
      <Container>
        <NewCard />
        {items.map((item) => (
          <Itemcard
            key={item._id}
            {...item}
            onClickPath={`/item/${item._id}/edit`}
          />
        ))}
      </Container>
    </TitledPage>
  );
};

export default Items;
