import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import NavElt from './NavElt';
import { ReactComponent as ShopSVG } from 'src/assets/svgs/shop2.svg';
import { ReactComponent as User } from 'src/assets/svgs/user2.svg';
import { ReactComponent as CartSVG } from 'src/assets/svgs/cart.svg';
import { ReactComponent as SearchSVG } from 'src/assets/svgs/magnifier.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Nav = ({ enableSearch }) => {
  const user = useSelector((state) => state.user);
  const userText = user ? 'My Page' : 'Log In';
  const shopText = user && user.shop && user.shop.accepted ? 'Shop Manager' : 'Open a Shop';
  const shopIcon = <ShopSVG />;
  const userIcon = <User />;
  const cartIcon = <CartSVG />;
  const searchIcon = <SearchSVG onClick={() => enableSearch()} />;
  const userTo = user ? '/profile/details' : '/login';
  const cartNotif = user && user.cart ? user.cart.length || '0' : '0';
  
  return (
  <Container>
    <NavElt
      icon={searchIcon}
      to='/browse'
      mobile
    />
    <NavElt
      icon={shopIcon}
      label={shopText}
      to='/shop'
    />
    <NavElt
      icon={userIcon}
      label={userText}
      to={userTo}
    />
    <NavElt
      icon={cartIcon}
      label='Cart'
      to='/cart'
      notification={cartNotif}
      top={-8}
      right={-10}
    />
  </Container>
  )
};

export default Nav;
