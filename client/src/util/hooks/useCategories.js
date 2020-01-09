import React, { useState, useEffect } from 'react';

const useCategories = () => {
  const tempCat = [{
    korean: '홈&리빙',
    name: 'living'
  }, {
    korean: '주방',
    name: 'kitchen'
  },
  {
    korean: '패션&악세서리',
    name: 'fashion'
  },
  {
    korean: '테크',
    name: 'tech'
  },
  {
    korean: 'Limited',
    name: 'limited'
  }];
  
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setCategories(tempCat);
  }, [])
  
  return categories;
}

export default useCategories;