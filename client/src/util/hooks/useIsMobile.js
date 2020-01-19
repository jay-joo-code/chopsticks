import React, { useState, useEffect } from 'react';
import theme from 'src/theme';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState();
  useEffect(() => {
    if (window.innerWidth < theme.desktopContentWidth) {
      setIsMobile(true)
    }
    else {
      setIsMobile(false)
    }
  }, [window.innerWidth])
  return isMobile;
}

export default useIsMobile;