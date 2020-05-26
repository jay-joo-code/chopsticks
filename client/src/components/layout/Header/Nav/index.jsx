import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import NavElt from './NavElt';
import { ReactComponent as OpenAShopSVG } from 'src/assets/svgs/open-a-shop.svg';
import { ReactComponent as ShopManagerSVG } from 'src/assets/svgs/shop-manager.svg';
import { ReactComponent as ProfileRaw } from 'src/assets/svgs/default-avatar.svg';
import { ReactComponent as CartRaw } from 'src/assets/svgs/cart.svg';
import { ReactComponent as SearchSVG } from 'src/assets/svgs/magnifier.svg';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const OpenAShop = styled(OpenAShopSVG)`
  height: 30px;
  width: 90px;
`

const ShopManager = styled(ShopManagerSVG)`
  height: 30px;
  width: 90px;
`

const CartSVG = styled(CartRaw)`
  height: 25px;
  width: 25px;
`

const ProfileSVG = styled(ProfileRaw)`
  height: 25px;
  width: 25px;
`

const HoriMargin = styled.div`
  margin-left: 1rem;
`

const Nav = ({ enableSearch }) => {
  const user = useSelector((state) => state.user);
  const userText = user ? 'My Page' : 'Log In';
  const shopIcon = user && user.shop && user.shop.accepted ? <ShopManager /> : <OpenAShop />;
  const userIcon = <ProfileSVG />;
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
    <HoriMargin />
    <Link to='/shop'>
      {shopIcon}
    </Link>
  </Container>
  )
};

export default Nav;
