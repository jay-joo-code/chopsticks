import React from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import getQuery from 'src/util/path/getQuery';
import useCategories from 'src/util/hooks/useCategories';
import Subheading from 'src/components/common/fonts/Subheading';
import Body from 'src/components/common/fonts/Body';
import updateQuery from 'src/util/path/updateQuery';

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
`;

const Cat = styled(Subheading)`
  cursor: pointer;
  color: ${props => props.on ? props.theme.primary : ''};
`

const Subcat = styled(Body)`
  margin: 0 .5rem;
  cursor: pointer;
  color: ${props => props.on ? props.theme.primary : ''};
  opacity: ${props => props.on ? '1' : ''};
`

const VertLine = styled.div`
  height: 100%;
  border-right: 1px solid black;
  margin: 0 1rem;
`

const Categories = () => {
  const location = useLocation();
  const history = useHistory();
  const query = getQuery(location);
  const curCatName = query.category;
  const cats = useCategories();
  const curCat = cats.filter((cat) => cat.name === curCatName)[0];
  
  const updateSubcatQuery = (subcat) => {
    let newQuery = { ...query };
    newQuery.subcat = subcat;
    updateQuery(newQuery, location, history)
  }
  
  const resetSubcatQuery = () => {
    let newQuery = { ...query };
    if (newQuery.subcat) newQuery.subcat = undefined
    updateQuery(newQuery, location, history)
    
  }
  
  return (
    <Container>
      {curCat && 
        <Cat 
          onClick={resetSubcatQuery}
          on={curCat.name === query.category && !query.subcat ? 1 : 0}
        >
          {curCat.name}
        </Cat>
      }
      <VertLine />
      {curCat && curCat.sub.map((subcat) => (
        <Subcat 
          onClick={() => updateSubcatQuery(subcat)}
          on={subcat === query.subcat ? 1 : 0}
        >
          {subcat}
        </Subcat>
      ))}
    </Container>
  )
};

export default Categories;
