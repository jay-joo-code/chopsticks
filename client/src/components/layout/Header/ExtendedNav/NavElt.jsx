import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const NavElt = (props) => {
  const { name, path } = props;
  const { pathname, search } = useLocation();
  const url = pathname + search;
  const isOn = url.includes(path);
  const condClass = isOn ? 'on' : '';

  return (
    <li className={condClass}>
      <Link to={path}>{name}</Link>
    </li>
  );
};

export default NavElt;
