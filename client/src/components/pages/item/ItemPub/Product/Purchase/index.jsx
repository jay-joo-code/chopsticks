import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'src/components/common/form/Select';
import RedButton from 'src/components/common/buttons/RedButton';
import theme from 'src/theme';
import Compressed from './Compressed';
import log from 'src/util/log';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';

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

const SelectCont = styled.div`
  margin: .5rem 0;
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

const CartAlert = styled.p`
  font-size: .8rem;
  opacity: .8;
  text-align: center;
`

const Purchase = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const price = item && item.price && item.price.toLocaleString('en');
  const isDesktop = window.innerWidth >= theme.desktopContentWidth;
  const handleClick = () => {
    setExpanded(!expanded);
  };
  
  const [optOne, setOptOne] = useState(0);
  const [optTwo, setOptTwo] = useState(0);
  const [itemToCart, setItemToCart] = useState(false);
  const handleOptOneChange = (e) => setOptOne(e.target.value);
  const handleOptTwoChange = (e) => setOptTwo(e.target.value);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const handleAddToCart = () => {
    if (!user) history.push('/login');
    const cartObj = {
      item: item._id,
      optionsIndex: [Number(optOne), Number(optTwo)],
      quantity: 1
    }
    axios.post(`/api/user/${user._id}/cart/add`, { cartObj })
      .then((res) =>{
        setItemToCart(true);
        fetchSelfAndStore(user._id);
      })
      .catch((e) => {
        log(`ERROR add item to cart`)
      })
  }

  if (!item) return <div />;
  if (!isDesktop && !expanded) return (
    <Compressed 
      item={item} 
      expanded={expanded} 
      setExpanded={setExpanded} 
    />
  )

  return (
    <DyncCont>
      <Container>
        <Name>{item.name}</Name>
        <Price>{price}원</Price>
        {item.options.length > 0 && (
          <SelectCont>
            <Select
              value={optOne}
              onChange={handleOptOneChange}
            >
              {item.options && item.options.map((opt, i) => (
                <option key={opt.name} value={i}>
                  {opt.name}
                  {' '}
  (+
                  {opt.priceChange}
  )
                </option>
              ))}
            </Select>
          </SelectCont>
        )}
        {item.optionsTwo.length > 0 && (
        <SelectCont>
          <Select
            value={optTwo}
            onChange={handleOptTwoChange}
          >
            {item.optionsTwo && item.optionsTwo.map((opt, i) => (
              <option key={opt.name} value={i}>
                {opt.name}
                {' '}
(+
                {opt.priceChange}
)
              </option>
            ))}
          </Select>
        </SelectCont>
        )}
        <BuySect>
          <BuyButton white rounded>즉시 구매</BuyButton>
          <BuyButton onClick={handleAddToCart} green rounded>장바구니에 담기</BuyButton>
          {itemToCart && <CartAlert>카트에 담겼습니다</CartAlert>}
          {!isDesktop && <CloseBtn onClick={handleClick}>축소</CloseBtn>}
        </BuySect>
      </Container>
    </DyncCont>
  );
};

export default Purchase;
