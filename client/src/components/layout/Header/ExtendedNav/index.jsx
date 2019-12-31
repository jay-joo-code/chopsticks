import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import DynamicContainer from 'src/components/layout/DynamicContainer';
import useCurrentItem from 'src/util/hooks/useCurrentItem';
import useIsOwner from 'src/util/hooks/useIsOwner';
import NavElt from './NavElt';

const StyledDynamicContainer = styled(DynamicContainer)`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
`;

const ExtendedNav = () => {
  const { pathname } = useLocation();
  const selector = pathname.split('/')[1];
  const item = useCurrentItem();
  const [itemId, setItemId] = useState();
  useEffect(() => {
    setItemId(selector === 'item' ? item._id : null);
  }, [selector, item]);
  const isOwner = useIsOwner();

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
  },
  ];

  const itemNav = [{
    name: '작품',
    path: `/item/${itemId}/details`,
  },
  {
    name: '리뷰',
    path: `/item/${itemId}/reviews`,
  },
  {
    name: '정책',
    path: `/item/${itemId}/policies`,
  },
  {
    name: '관리자',
    path: `/item/${itemId}/admin`,
    hide: !isOwner,
  },
  ];

  const nav = {
    profile: profileNav,
    item: itemNav,
  };
  const selectedNav = nav[selector];

  if (!selectedNav) return <div />;

  return (
    <StyledDynamicContainer>
      {selectedNav.map((elt) => (
        <NavElt key={elt.name} {...elt} />
      ))}
    </StyledDynamicContainer>
  );
};

export default ExtendedNav;
