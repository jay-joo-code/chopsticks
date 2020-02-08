import React, { useState, useEffect } from 'react';

const useCategories = () => {
  const tempCat = [{
    korean: '홈데코',
    name: 'living'
  }, {
    korean: '주방 / 욕실',
    name: 'kitchen'
  },
  {
    korean: '가구',
    name: 'furniture'
  },
  {
    korean: '테크',
    name: 'tech'
  },
  {
    korean: 'One & Only',
    name: 'limited'
  }];
  
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setCategories(tempCat);
  }, [])
  
  return categories;
}

export default useCategories;