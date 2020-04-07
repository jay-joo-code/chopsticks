import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { adminNav, profileNav, categoryNav } from './routes';
import NavElt from './NavElt';
import './ExtendedNav.css';

const Container = styled.div`
  border-top: 1px solid rgba(0, 0, 0, .1);
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  margin: 0 0 1rem 0;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    margin: 1rem 0;
  }
`

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
    <Container>
      <nav className="gnb">
        <ul>
          {nav.map((elt) => (
            <NavElt key={elt.name} {...elt} />
          ))}
        </ul>
      </nav>
    </Container>
  );
};

export default ExtendedNav;
