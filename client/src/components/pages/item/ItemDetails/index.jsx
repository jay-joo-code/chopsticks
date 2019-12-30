import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from './Image';
import Info from './Info';
import ItemPage from 'src/components/layout/ItemPage';
import useCurrentItem from 'src/util/hooks/useCurrentItem';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ItemDetails = () => {
  const item = useCurrentItem();
  
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
