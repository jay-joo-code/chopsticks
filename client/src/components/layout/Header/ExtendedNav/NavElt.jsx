import React from 'react';
import { Link } from 'react-router-dom';

const NavElt = (props) => {
  const condClass = props.on ? 'on' : '';
  
  return (
    <li className={condClass}>
      <Link to={props.path}>{props.text}</Link>
    </li>
  )
};

export default NavElt;
