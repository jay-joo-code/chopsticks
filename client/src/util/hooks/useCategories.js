import React, { useState, useEffect } from 'react';

const useCategories = () => {
  const tempCat = [{
    korean: '홈데코',
    name: 'living',
    sub: ['조명', '오브제', '캔들', '방향', '월데코']
  }, {
    korean: '주방 / 욕실',
    name: 'kitchen',
    sub: []
  },
  {
    korean: '가구',
    name: 'furniture',
    sub: ['컵', '그릇', '조리기구']
  },
  {
    korean: '테크',
    name: 'tech',
    sub: []
  },
  {
    korean: 'One & Only',
    name: 'limited',
    sub: ['졸업작품']
  }];
  
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setCategories(tempCat);
  }, [])
  
  return categories;
}

export default useCategories;