import React from 'react';
import styled from 'styled-components';
import useCurrentItem from 'src/util/hooks/useCurrentItem';
import Details from './Details';

const Container = styled.div`
  margin: 2rem 0;
`;

const Product = () => {
  const item = useCurrentItem();

  if (!item) return <div />;
  return (
    <Container>
      <Details item={item} />
    </Container>
  );
};

export default Product;
