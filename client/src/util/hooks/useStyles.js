import React, { useState, useEffect } from 'react';

const useStyles = () => {
  const tempStyles = ['Crafted', 'Original'];
  
  const [styles, setStyles] = useState([]);
  useEffect(() => {
    setStyles(tempStyles);
  }, [])
  
  return styles;
}

export default useStyles;