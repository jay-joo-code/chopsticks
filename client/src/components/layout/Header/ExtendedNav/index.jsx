import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import DynamicContainer from 'src/components/layout/DynamicContainer';
import NavElt from './NavElt';

const StyledDynamicContainer = styled(DynamicContainer)`
  display: flex;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
`;

const ExtendedNav = () => {
  const { pathname } = useLocation();
  const profileNav = [{
    name: '프로필',
    path: '/profile',
  },
  {
    name: '결제내역',
    path: '/profile/transactions',
  },
  {
    name: '상품',
    path: '/profile/items',
  },
  {
    name: '주문내역',
    path: '/profile/orders',
  }];

  const isProfile = pathname.split('/')[1] === 'profile';

  if (!isProfile) return <div />;

  return (
    <StyledDynamicContainer>
      {profileNav.map((elt) => (
        <NavElt {...elt} />
      ))}
    </StyledDynamicContainer>
  );
};

export default ExtendedNav;
