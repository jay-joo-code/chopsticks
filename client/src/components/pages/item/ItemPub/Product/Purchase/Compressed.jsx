import React from 'react';
import styled from 'styled-components';
import RedButton from 'src/components/common/buttons/RedButton';
import FixedBottomPanel from 'src/components/layout/FixedBottomPanel';

const Compressed = ({ item, expanded, setExpanded }) => {
  const price = item && item.price && item.price.toLocaleString('en');
  if (!item) return <div />;
  const handleClick = () => {
    setExpanded(!expanded);
  };

  const buyBtn = <RedButton green rounded onClick={handleClick}>구매 정보</RedButton>;

  return (
    <FixedBottomPanel
      text={item.name}
      supportText={`${price}원`}
      button={buyBtn}
    />
  );
};

export default Compressed;
