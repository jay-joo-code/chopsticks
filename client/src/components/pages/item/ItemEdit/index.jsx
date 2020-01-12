import React from 'react';
import useCurrentItem from 'src/util/hooks/useCurrentItem';
import useIsOwner from 'src/util/hooks/useIsOwner';
import EditForm from './EditForm';

const ItemEdit = () => {
  const isOwner = useIsOwner();
  const item = useCurrentItem();
  if (item && isOwner) return <EditForm item={item} />;
  return <div />;
};

export default ItemEdit;
