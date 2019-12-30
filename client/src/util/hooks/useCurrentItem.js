import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import log from 'src/util/log';

const useCurrentItem = () => {
  const [item, setItem] = useState({});
  const { pathname } = useLocation();
  const [itemId, setItemId] = useState();
  useEffect(() => {
    setItemId(pathname.split('/')[2]);  
  }, [pathname])

  useEffect(() => {
    if (pathname.split('/')[1] === 'item' && itemId) {
      axios.get(`/api/item/${itemId}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((e) => {
        log('ERROR fetching item', e);
      })
    }
  }, [itemId])
  
  return item;
}

export default useCurrentItem;