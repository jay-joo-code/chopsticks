import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import getQuery from 'src/util/path/getQuery';
import useCategories from 'src/util/hooks/useCategories';
import Subheading from 'src/components/common/fonts/Subheading';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  
  & > p {
    margin: 0 .5rem;
    cursor: pointer;
  }
`;

const VertLine = styled.div`
  height: 100%;
  border-right: 1px solid black;
  margin: 0 1rem;
`

const Categories = () => {
  const location = useLocation();
  const query = getQuery(location);
  const curCatName = query.category;
  const cats = useCategories();
  const curCat = cats.filter((cat) => cat.name === curCatName)[0];
  
  return (
    <Container>
      {curCat && <Subheading>{curCat.korean}</Subheading>}
      <VertLine />
      {curCat && curCat.sub.map((subCat) => (
        <Body>{subCat}</Body>
      ))}
    </Container>
  )
};

export default Categories;
