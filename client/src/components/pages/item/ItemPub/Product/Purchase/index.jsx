import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'src/components/common/form/Select';
import RedButton from 'src/components/common/buttons/RedButton';
import theme from 'src/theme';
import log from 'src/util/log';
import Compressed from './Compressed';

const DyncCont = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: inline-block;
  z-index: 20;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    background-color: inherit;
    display: block;
    width: auto;
    cursor: default;
    position: static;
  }
`;
const Container = styled.div`
  position: sticky;
  top: 0;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  opacity: .8;
  
`;

const Price = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${(props) => props.theme.green};
  margin: 2rem 0;
`;

const BuySect = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
`;

const BuyButton = styled(RedButton)`
  margin: .5rem 0;
`;

const CloseBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;

const Purchase = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const price = item && item.price && item.price.toLocaleString('en');
  const isDesktop = window.innerWidth >= theme.desktopContentWidth;
  const handleClick = () => {
    setExpanded(!expanded);
  };

  if (!item) return <div />;
  if (!isDesktop && !expanded) {
    return <Compressed item={item} expanded={expanded} setExpanded={setExpanded} />;
  }

  return (
    <DyncCont>
    
      <Container>
        <Name>{item.name}</Name>
        <Price>
          {price}
원
        </Price>
        <Select>
          {item.options && item.options.map((opt, i) => (
            <option key={i}>
              {opt.name}
              {' '}
(+
              {opt.priceChange}
)
            </option>
          ))}
        </Select>
        <Select>
          {item.optionsTwo && item.optionsTwo.map((opt, i) => (
            <option key={i}>
              {opt.name}
              {' '}
(+
              {opt.priceChange}
)
            </option>
          ))}
        </Select>
        <BuySect>
          <BuyButton white rounded>즉시 구매</BuyButton>
          <BuyButton green rounded>장바구니에 담기</BuyButton>
          {!isDesktop && <CloseBtn onClick={handleClick}>축소</CloseBtn>}
        </BuySect>
      </Container>
    
    </DyncCont>
  );
};

export default Purchase;
