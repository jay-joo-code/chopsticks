import React, { useEffect } from 'react';
import styled from 'styled-components';
import Toolbar from './Toolbar';
import ItemsList from './ItemsList';
import getQuery from 'src/util/path/getQuery';
import updateQuery from 'src/util/path/updateQuery';
import { useLocation, useHistory } from 'react-router-dom';
import useIsMobile from 'src/util/hooks/useIsMobile';
import SearchBox from 'src/components/common/form/SearchBox';

const Container = styled.div`

`;

const SearchCont = styled.div`
  display: flex;
  justify-content: center;
`

const Browse = () => {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const query = getQuery(location);
    if (!query.page || !query.limit) {
      const newQuery = {
        ...query,
        page: 1,
        limit: 16
      }
      updateQuery(newQuery, location, history);
    }
  }, [location])
  const isMobile = useIsMobile();
  
  return (
    <Container>
      <SearchCont>
        {isMobile && <SearchBox />}
      </SearchCont>
      <Toolbar />
      <ItemsList />
    </Container>
  )
};

export default Browse;
