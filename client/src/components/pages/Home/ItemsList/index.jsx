import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import log from 'src/util/log';
import ItemsList from 'src/components/layout/ItemsList';
import Heading from 'src/components/common/fonts/Heading';
import PageNav from 'src/components/layout/PageNav';
import { sendAlert } from 'src/util/bizm';

const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleSect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 0 4rem 0;
`;

const ItemsListComp = () => {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState();
  
  useEffect(() => {
    axios.get('/api/item?page=1&limit=16')
      .then((res) => {
        setItems(res.data.docs);
        setMeta(res.data);
      })
      .catch((e) => {
        log('ERROR fetching items at home', e);
      });
  }, []);
  
  sendAlert();  

  return (
    <Container>
      <TitleSect>
        <Heading>Designer's Items</Heading>
      </TitleSect>
      <ItemsList items={items} />
      {meta && <PageNav metadata={meta} />}
    </Container>
  );
};

export default ItemsListComp;
