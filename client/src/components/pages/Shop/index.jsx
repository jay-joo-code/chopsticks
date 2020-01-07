import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import log from 'src/util/log';
import Items from 'src/components/pages/profile/Items';

const Container = styled.div `

`;

const Shop = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      history.push('/shop/intro');
    }
    else {
      setLoading(true);
      fetchSelfAndStore(user._id)
        .then(() => {
          setLoading(false);
          if (!user.shop.applied) {
            history.push('/shop/intro');
          }
          else if (user.shop.applied && !user.shop.accepted) {
            history.push('/shop/apply/pending');
          }
          else {
            history.push('/shop/items')
          }
        })
        .catch((e) => {
          setLoading(false);
          log('ERROR store routing')
        })
    }
  }, []);

  if (loading) return <div />;

  return (
    <Container>
      
    </Container>
  );
};

export default Shop;
