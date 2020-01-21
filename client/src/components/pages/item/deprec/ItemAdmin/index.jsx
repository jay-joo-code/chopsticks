import React from 'react';
import useCurrentItem from 'src/util/hooks/useCurrentItem';
import useIsOwner from 'src/util/hooks/useIsOwner';
import ItemPage from 'src/components/layout/ItemPage';
import AdminContent from './AdminContent';

const ItemAdmin = () => {
  const item = useCurrentItem();
  const isOwner = useIsOwner();

  return (
    <ItemPage>
      {isOwner
        ? <AdminContent {...item} />
        : <p>상품 관리자 계정으로 로그인해야 접속 가능합니다</p>}
    </ItemPage>
  );
};

export default ItemAdmin;
