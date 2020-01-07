import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import log from 'src/util/log';

const Shop = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/shop/intro');
    } else {
      fetchSelfAndStore(user._id)
        .then(() => {
          if (!user.shop.applied) {
            history.push('/shop/intro');
          } else if (user.shop.applied && !user.shop.accepted) {
            history.push('/shop/apply/pending');
          } else {
            history.push('/shop/admin/items');
          }
        })
        .catch((e) => {
          log('ERROR store routing');
        });
    }
  }, []);

  return <div />;
};

export default Shop;
