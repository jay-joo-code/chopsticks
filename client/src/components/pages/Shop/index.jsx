import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import log from 'src/util/log';

const Container = styled.div `

`;

const Shop = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchSelfAndStore(user._id)
      .then(() => {
        setLoading(false);
        if (!user || !user.shop.applied) {
          history.push('/shop/intro');
        }
        else if (user && user.shop.applied && !user.shop.accepted) {
          history.push('/shop/apply/pending');
        }
      })
      .catch((e) => {
        setLoading(false);
        log('ERROR store routing')
      })
  }, []);
  
  if (loading) return <div />;

  return (
    <Container>
      Shop
    </Container>
  );
};

export default Shop;
