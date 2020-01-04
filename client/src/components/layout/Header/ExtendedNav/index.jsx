import React from 'react';
import './ExtendedNav.css';

const ExtendedNav = () => (
  <nav className="gnb">
    <ul>
      <li className="on">
        <a href="/category">Accessories</a>
      </li>
      <li>
        <a href="/category">Stationery</a>
      </li>
      <li>
        <a href="/category">Home & Living</a>
      </li>
      <li>
        <a href="/category">Bags</a>
      </li>
      <li>
        <a href="/category">Clothing</a>
      </li>
      <li>
        <a href="/category">Skin & Hair</a>
      </li>
      <li>
        <a href="/category">Watches</a>
      </li>
    </ul>
  </nav>
);

export default ExtendedNav;
