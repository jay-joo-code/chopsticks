import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TabbedPage from 'src/components/layout/TabbedPage';
import Product from './Product';
import Reviews from './Reviews';
import Policies from './Policies';

const Container = styled.div`
`;

const ItemPub = () => {
  const productComp = <Product />;
  const reviewsComp = <Reviews />;
  const policiesComp = <Policies />;
  
  const pages = [{
    name: '상품',
    component: productComp,
  }, {
    name: '리뷰',
    component: reviewsComp,
  }, {
    name: '배송/정책',
    component: policiesComp,
  }];
  return (
    <Container>
      <TabbedPage 
        pages={pages} 
      />
    </Container>
  );
};

export default ItemPub;
