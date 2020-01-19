import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import log from 'src/util/log';
import ItemsList from 'src/components/layout/ItemsList';
import PageNav from 'src/components/layout/PageNav';

const Container = styled.div`

`;

const NavCont = styled.div`
  margin-top: 2rem;
`;

const ItemsListComp = () => {
  const { search } = useLocation();
  const [items, setItems] = useState([]);
  const [metadata, setMetadata] = useState({});
  useEffect(() => {
    axios.get(`/api/item${search}`)
      .then((res) => {
        setMetadata({
          page: res.data.page,
          totalPages: res.data.totalPages,
        });
        setItems(res.data.docs);
      })
      .catch((e) => {
        log('ERROR fetch filtered items', e);
      });
  }, [search]);

  if (!items || !metadata) return <div />;

  return (
    <Container>
      <ItemsList items={items} />
      <NavCont>
        <PageNav metadata={metadata} />
      </NavCont>
    </Container>
  );
};

export default ItemsListComp;
