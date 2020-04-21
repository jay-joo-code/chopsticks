import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import api from 'src/util/api';
import log from 'src/util/log';
import ItemsList from 'src/components/layout/ItemsList';
import PageNav from 'src/components/layout/PageNav';

const Container = styled.div`

`;

const NavCont = styled.div`
  margin-top: 2rem;
`;

const ItemsListComp = () => {
  const location = useLocation();
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [metadata, setMetadata] = useState({});
  
  useEffect(() => {
    api.get(`/item${location.search}`)
      .then((res) => {
        if (res.data.page && res.data.totalPages) {
          setMetadata({
            page: res.data.page,
            totalPages: res.data.totalPages,
          });
        }
        if (res.data.docs) setItems(res.data.docs);
      })
      .catch((e) => {
        log('ERROR fetch filtered items', e);
      });
  }, [location, history]);

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
