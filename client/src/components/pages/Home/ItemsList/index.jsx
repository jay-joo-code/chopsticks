import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from 'src/util/api';
import log from 'src/util/log';
import ItemsList from 'src/components/layout/ItemsList';
import Heading from 'src/components/common/fonts/Heading';
import PageNav from 'src/components/layout/PageNav';
import useRouter from 'src/util/hooks/useRouter';

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
  padding: 2rem 0 1.5rem 0;
`;

const StyledHeading = styled(Heading)`
  font-size: 1.6rem;
`

const ItemsListComp = () => {
  const [items, setItems] = useState([]);
  const [metadata, setMetadata] = useState();
  const router = useRouter();
  
  // set initial page and limit
  useEffect(() => {
    router.updateQuery({ page: 1, limit: 16 })
  }, [])
  
  useEffect(() => {
    api.get(`/item${router.location.search}&limit=16`)
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
  }, [router.location]);

  return (
    <Container>
      <TitleSect>
        <StyledHeading>Designer's Items</StyledHeading>
      </TitleSect>
      <ItemsList items={items} />
      {metadata && <PageNav metadata={metadata} />}
    </Container>
  );
};

export default ItemsListComp;
