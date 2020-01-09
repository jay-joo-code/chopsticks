import React from 'react';
import styled from 'styled-components';
import useCurrentItem from 'src/util/hooks/useCurrentItem';
import Owner from './Owner';
import Details from './Details';
import Purchase from './Purchase';

const Container = styled.div`
  padding: 2rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Product = () => {
  const item = useCurrentItem();

  return (
    <Container>
      <Wrapper>
        <Owner item={item} />
        <Details item={item} />
        <Purchase item={item} />
      </Wrapper>
    </Container>
  );
};

export default Product;
