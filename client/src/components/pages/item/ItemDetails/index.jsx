import React from 'react';
import styled from 'styled-components';
import ItemPage from 'src/components/layout/ItemPage';
import useCurrentItem from 'src/util/hooks/useCurrentItem';
import Image from './Image';
import Info from './Info';

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
  );
};

export default ItemDetails;
