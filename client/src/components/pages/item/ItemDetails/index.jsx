import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from './Image';
import Info from './Info';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import log from 'src/util/log';
import ItemPage from 'src/components/layout/ItemPage';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ItemDetails = () => {
  const [item, setItem] = useState({});
  const { pathname } = useLocation();
  const itemId = pathname.split('/')[2];
  useEffect(() => {
    axios.get(`/api/item/${itemId}`)
      .then((res) => {
        log('FETCH item data', res.data);
        setItem(res.data);
      })
      .catch((e) => {
        log('ERROR fetching item', e);
      })
  }, [])
  
  return (
    <ItemPage>
      <Container>
          <Image {...item} />
          <Info {...item} />
      </Container>
    </ItemPage>
  )
};

export default ItemDetails;
