import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'src/components/common/form/Select';
import RedButton from 'src/components/common/buttons/RedButton';
import theme from 'src/theme';
import log from 'src/util/log';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import Compressed from './Compressed';
import Alert from 'src/components/common/displays/Alert';

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
    height: 100%;
    display: block;
    width: auto;
    cursor: default;
    position: static;
  }
`;
const Container = styled.div`
  position: sticky;
  top: 2rem;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  max-width: 250px;
  opacity: .8;
  white-space: pre-line;
  text-align: center;
`;

const SelectCont = styled.div`
  margin: .5rem 0;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: bold;
  opacity: .6;
  margin: 2rem 0;
`;

const BuySect = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
`;

const BuyButton = styled(RedButton)`
  margin: .5rem 0;
  border-radius: 10px;
  padding-right: 4rem;
  padding-left: 4rem;
  
  // white
  border: ${props => props.white ? '1px solid rgba(0, 0, 0, .3)' : ''};
`;

const CloseBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;

const Purchase = ({ item }) => {
  // mobile 
  const [expanded, setExpanded] = useState(false);
  const price = item && item.price && item.price.toLocaleString('en');
  const isDesktop = window.innerWidth >= theme.desktopContentWidth;
  const handleClick = () => {
    setExpanded(!expanded);
  };
  
  // alert
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // opts
  const [optionsIndex, setOptionsIndex] = useState(Array(item.optGrps.length));
  const handleOptChange = (e, optGrpIndex) => {
    const selectedIndex = e.target.value;
    let newIndexArray = [...optionsIndex];
    newIndexArray.splice(optGrpIndex, 1, selectedIndex);
    setOptionsIndex(newIndexArray);
  }
  
  // add to cart
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const handleAddToCart = () => {
    // validation
    if (!user) history.push('/login');
    else if (optionsIndex.includes(undefined)) {
     setIsSuccess(false);
     setShowAlert(true);
    }
    
    else {
      const cartObj = {
        item: item._id,
        optionsIndex,
        quantity: 1,
      };
      axios.post(`/api/user/${user._id}/cart/add`, { cartObj })
        .then((res) => {
          setIsSuccess(true);
          setShowAlert(true);
          fetchSelfAndStore(user._id);
        })
        .catch((e) => {
          log('ERROR add item to cart');
        });
    }
  };
  
  // conditional rendering
  if (!item) return <div />;
  if (!isDesktop && !expanded) {
    return (
      <Compressed
        item={item}
        expanded={expanded}
        setExpanded={setExpanded}
      />
    );
  }

  return (
    <DyncCont>
      <Container>
        <Name>{item.name}</Name>
        <Price>
          {price}
원
        </Price>
        {item.optGrps.map((optGrp, optGrpIndex) => (
          <SelectCont>
            <Select
              value={optionsIndex[optGrpIndex] || ''}
              onChange={(e) => handleOptChange(e, optGrpIndex)}
              placeholder={optGrp.title}
            >
              {optGrp.opts.map((opt, i) => (
                <option key={opt.name} value={i}>
                  {`${opt.name} (+${opt.diff})`}
                </option>
              ))}
            </Select>
          </SelectCont>
        ))}
        <BuySect>
          <BuyButton white rounded>즉시 구매</BuyButton>
          <BuyButton onClick={handleAddToCart} green rounded>장바구니에 담기</BuyButton>
          <Alert
            show={showAlert}
            color={isSuccess ? 'primary' : 'danger'}
            setShow={setShowAlert}
            msg={
              isSuccess
                ? '카트에 상품을 담았습니다'
                : '옵션을 골라주세요'
            }
          />
          {!isDesktop && <CloseBtn onClick={handleClick}>축소</CloseBtn>}
        </BuySect>
      </Container>
    </DyncCont>
  );
};

export default Purchase;
