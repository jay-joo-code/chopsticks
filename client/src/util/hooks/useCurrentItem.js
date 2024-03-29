import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from 'src/util/api';
import log from 'src/util/log';

const useCurrentItem = (version) => {
  const [item, setItem] = useState();
  const { pathname } = useLocation();
  const [itemId, setItemId] = useState();
  useEffect(() => {
    setItemId(pathname.split('/')[2]);  
  }, [pathname])

  useEffect(() => {
    if (pathname.split('/')[1] === 'item' && itemId) {
      api.get(`/item/${itemId}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((e) => {
        log('ERROR fetching item', e);
      })
    }
  }, [itemId, version])
  
  return item;
}

export default useCurrentItem;