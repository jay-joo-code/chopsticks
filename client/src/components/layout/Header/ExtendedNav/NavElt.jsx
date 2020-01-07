import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const NavElt = (props) => {
  const { name, path } = props;
  const location = useLocation();
  const condClass = location.pathname + location.search === path ? 'on' : '';

  return (
    <li className={condClass}>
      <Link to={path}>{name}</Link>
    </li>
  );
};

export default NavElt;
