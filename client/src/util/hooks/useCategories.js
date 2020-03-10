import React, { useState, useEffect } from 'react';
import tempCat from './categories';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setCategories(tempCat);
  }, [])
  
  return categories;
}

export default useCategories;