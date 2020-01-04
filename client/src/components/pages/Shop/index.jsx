import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Container = styled.div`

`;

const Shop = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  useEffect(() => {
    if (!user || !user.shop.applied) {
      history.push('/shop/intro');
    } else if (user && user.shop.applied && !user.shop.accepted) {
      history.push('/shop/apply/pending');
    }
  }, [user]);

  return (
    <Container>
      Shop
    </Container>
  );
};

export default Shop;
