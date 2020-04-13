import React from 'react';
import NewBtns from './NewBtns';
import PendingBtns from './PendingBtns';

const ConditionalBtns = ({ state, selected, setSelected, v, setV }) => {
  if (state === 'new') return (
    <NewBtns
      selected={selected}
      setSelected={setSelected}
      v={v}
      setV={setV}
    />
  )
  
  if (state === 'pending') return (
    <PendingBtns
      selected={selected}
      setSelected={setSelected}
      v={v}
      setV={setV}
    />
  )
  
  return <div />;
};

export default ConditionalBtns;
