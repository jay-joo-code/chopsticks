import React, { useState } from 'react';
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
  const [version, setVersion] = useState(0);
  const item = useCurrentItem(version);

  return (
    <ItemPage>
      <Container>
        <Image {...item} version={version} setVersion={setVersion} />
        <Info {...item} version={version} setVersion={setVersion} />
      </Container>
    </ItemPage>
  );
};

export default ItemDetails;
