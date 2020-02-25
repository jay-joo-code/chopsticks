import React from 'react';
import PoliciesPage from './PoliciesPage';
import useCurrentItem from 'src/util/hooks/useCurrentItem';

const Policies = () => {
  const item = useCurrentItem();
  if (!item) return <div />;
  
  return (
  <PoliciesPage
    item={item}
  />
  )
};

export default Policies;
