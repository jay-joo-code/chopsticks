import React from 'react';
import PoliciesPage from './PoliciesPage';
import useCurrentItem from 'src/util/hooks/useCurrentItem';

const Policies = () => {
  const item = useCurrentItem();
  if (!item) return <div />;
  const policies = item.owner.shop.policies;
  
  return (
  <PoliciesPage
    policies={policies}
  />
  )
};

export default Policies;
