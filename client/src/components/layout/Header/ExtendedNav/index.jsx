import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { adminNav, profileNav, categoryNav } from './routes';
import NavElt from './NavElt';
import './ExtendedNav.css';

const ExtendedNav = () => {
  const { pathname } = useLocation();
  const [nav, setNav] = useState([]);
  // DIFF IN PROFILE, SHOP
  useEffect(() => {
    const pathArray = pathname.split('/');
    if (pathArray[1] === 'shop' && pathArray[2] === 'admin') {
      setNav(adminNav);
    } else if (pathArray[1] === 'profile') {
      setNav(profileNav);
    } else {
      setNav(categoryNav);
    }
  }, [pathname]);

  return (
    <nav className="gnb">
      <ul>
        {nav.map((elt) => (
          <NavElt key={elt.name} {...elt} />
        ))}
      </ul>
    </nav>
  );
};

export default ExtendedNav;
