import React, { useState, useEffect } from 'react';
import useCurrentItem from './useCurrentItem';
import { useSelector } from 'react-redux';

const useIsOwner = () => {
  const [isOwner, setIsOwner] = useState(false);
  const item = useCurrentItem();
  const user = useSelector((state) => state.user);
  const userId = user ? user._id : null;
  useEffect(() => {
    setIsOwner(item && item.owner ? userId === item.owner._id : false);
  }, [item, user, userId])
  return isOwner;
}

export default useIsOwner;