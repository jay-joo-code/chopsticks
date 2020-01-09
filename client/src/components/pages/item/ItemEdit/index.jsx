import React from 'react';
import styled from 'styled-components';
import useCurrentItem from 'src/util/hooks/useCurrentItem';
import EditForm from './EditForm';

const ItemEdit = () => {
  const item = useCurrentItem();
  if (!item) return <div />;
  return <EditForm item={item} />
};

export default ItemEdit;
