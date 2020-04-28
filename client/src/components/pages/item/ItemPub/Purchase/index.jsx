import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'src/components/common/form/Select';
import RedButton from 'src/components/common/buttons/RedButton';
import theme from 'src/theme';
import api from 'src/util/api';
import log from 'src/util/log';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import Compressed from './Compressed';
import Alert from 'src/components/common/displays/Alert';
import Body from 'src/components/common/fonts/Body';
import { useDispatch } from 'react-redux';

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
  align-items: stretch;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  max-width: 250px;
  opacity: .8;
  white-space: pre-line;
  text-align: center;
  word-break: break-word;
`;

const SelectCont = styled.div`
  margin: .5rem 0;
`;

const Price = styled.p`
  font-size: 2rem;
  font-weight: bold;
  opacity: .6;
  margin: 2rem 0;
  text-align: center;
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
  const isDesktop = window.innerWidth >= theme.desktopContentWidth;
  const handleClick = () => {
    setExpanded(!expanded);
  };
  
  // alert
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState('');
  
  // opts
  const initOptionsIndex = item.optGrps.map((optGrp) => {
    if (optGrp.optional) return 0;
    else return null;
  })
  const [optionsIndex, setOptionsIndex] = useState(initOptionsIndex);
  const handleOptChange = (e, optGrpIndex) => {
    const selectedIndex = e.target.value;
    let newIndexArray = [...optionsIndex];
    newIndexArray.splice(optGrpIndex, 1, selectedIndex);
    setOptionsIndex(newIndexArray);
  }
  
  const formatOptStr = (opt) => {
    if (!opt || !opt.optString) return '';
    const qtyString = item.madeOnOrder ? '' : `${opt.qty}개`;
    return `${opt.optString} (+ ${opt.diff}원) ${qtyString}`;
  }
  const findOptByIndex = (searchIndex) => {
    const foundOpt = optData.filter((opt, i) => {
      return opt.index.join() === searchIndex.join();
    });
    return foundOpt.length !== 0 ? foundOpt[0] : null;
  }
  
  // conditional render based on unset opt 
  const unsetOptCount = optionsIndex.filter((index) => index === null).length;
  const unsetOptIndex = optionsIndex.indexOf(null);
  const { optGrps, optData } = item;
  
  // selectedOpt
  // when all opts are selected, determine which opt combination was selected
  const [selectedOpt, setSelectedOpt] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    // do nothing if the item does not have options
    if (item.optData.length === 0) return;
    
    if (!optionsIndex.includes(null)) {
      const selectedOpt = findOptByIndex(optionsIndex)
      if (selectedOpt) {
        setSelectedOpt(selectedOpt)
      }
      else {
        // selected a combination that was deleted by seller
        // reset other optionsIndex
        dispatch({
          type: 'ALERT_SET',
          payload: {
            show: true,
            msg: '등록되지 않은 옵션 조합을 선택하셨습니다. 다른 옵션을 선택해주세요.',
            color: 'danger'
          }
        })
        setOptionsIndex(initOptionsIndex);
      }
    }
    else {
      setSelectedOpt(null)
    }
  }, [optionsIndex])

  // price 
  const priceWithDiff = selectedOpt ? item.price + selectedOpt.diff : item.price;
  const price = priceWithDiff.toLocaleString('en');

  // 수량
  const [quantity, setQuantity] = useState();
  const maxQty = selectedOpt 
    ? selectedOpt.qty 
    : item.optData.length === 0
    ? item.stock
    : 99;
  const quantityOpts = Array(maxQty).fill(null).map((elt, i) => i + 1);
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  }
  let helperText = '';
  if (item.madeOnOrder) helperText = '주문 후 제작';
  else if (selectedOpt) helperText = `${selectedOpt.qty}개 남음`;
  else if (item.optData.length === 0) helperText = `${item.stock}개 남음`;
  
  // add to cart
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const handleAddToCart = () => {
    // user validation
    if (!user) {
      history.push('/login');
      return;
    }

    // 옵션 validation
    if (item.optData.length !== 0) {
      if (optionsIndex.includes(null)) {
        // 선택안된 옵션이 optional 옵션일 경우, 자동으로 "선택안함" 옵션을 선택
        const autoSelectedOptionsIndex = optionsIndex.map((index, i) => {
          if (index !== null) return index;
          if (optGrps[i].optional) return 0;  // 0 이 "선택안함" 옵션임
          else return null;
        })
        if (autoSelectedOptionsIndex.includes(null)) {
          setIsSuccess(false);
          setMsg('옵션을 모두 선택해주세요')
          setShowAlert(true);
          return;
        }
      }
    }

    // 수량 validation
    if (!quantity) {
      setIsSuccess(false);
      setMsg('수량을 선택해주세요')
      setShowAlert(true);
      return;
    }

    // 재고 validation
    if (!item.madeOnOrder) {
      if (item.optData.length !== 0) {
        // 옵션 재고
        if (selectedOpt.qty === 0) {
          setIsSuccess(false);
          setMsg('선택하신 옵션이 재고가 없습니다. 다른 옵션을 선택해주세요')
          setShowAlert(true);
          return;
        } 
        else if (selectedOpt.qty < quantity) {
          setIsSuccess(false);
          setMsg('선택하신 옵션의 재고가 부족합니다. 수량을 줄이거나 다른 옵션을 선택해주세요')
          setShowAlert(true);
          return;
        }
      }
      else {
        // 상품 재고
        if (item.stock === 0) {
          setIsSuccess(false);
          setMsg('상품 재고가 없습니다')
          setShowAlert(true);
          return;
        }
      }
    }
    
    setMsg('')
    setShowAlert(false);
    
    const cartObj = {
      item,
      optionsIndex,
      quantity,
      optString: selectedOpt ? selectedOpt.optString : '옵션 없음',
      diff: selectedOpt ? selectedOpt.diff : 0
    };
    api.post(`/user/${user._id}/cart/add`, { cartObj })
      .then((res) => {
        setIsSuccess(true);
        setMsg('카트에 상품을 담았습니다')
        setShowAlert(true);
        fetchSelfAndStore(user._id);
      })
      .catch((e) => {
        log('ERROR add item to cart');
      });
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
        <Price>{price}원</Price>
        {item.optGrps.map((optGrp, optGrpIndex) => (
          <SelectCont>
            <Select
              value={optionsIndex[optGrpIndex] || ''}
              onChange={(e) => handleOptChange(e, optGrpIndex)}
              placeholder={optGrp.title}
              width='100%'
            >
              {optGrp.opts.map((opt, i) => {
                let curIndex = [...optionsIndex];
                curIndex.splice(optGrpIndex, 1, `${i}`);
                const curOpt = findOptByIndex(curIndex);
                
                let dispStr = '';
                if (unsetOptCount === 1) {
                  // render optData only for last optGrp
                  if (unsetOptIndex === optGrpIndex) {
                    dispStr = formatOptStr(curOpt);
                    
                    // don't render empty string
                    // this means this opt combination was deleted by the seller
                    if (!dispStr) return null;
                  }
                  // render opt for the other optGrps
                  else {
                    dispStr = opt;
                  }
                }
                else if (unsetOptCount === 0) {
                  // render optData for all optGrps
                  dispStr = formatOptStr(curOpt);

                  // render opt for the currently selected opt
                  if (Number(optionsIndex[optGrpIndex]) === i) {
                    dispStr = opt;
                  }
                    
                  // don't render empty string
                  // this means this opt combination was deleted by the seller
                  if (!dispStr) return null;
                }
                else {
                  // render opt only for all optGrps
                  dispStr = opt;
                }
                  
                return (
                  <option key={opt} value={i}>
                    {dispStr}
                  </option>
                )
              })}
            </Select>
          </SelectCont>
        ))}
        <SelectCont>
          <Select
            value={quantity || ''}
            onChange={handleQuantityChange}
            placeholder='수량'
            width='100%'
            helperText={helperText}
            maxSize={10}
          >
            {quantityOpts.map((quantity) => (
              <option key={quantity} value={quantity}>{quantity}</option>
            ))}
          </Select>
        </SelectCont>
        <BuySect>
          <BuyButton white rounded>즉시 구매</BuyButton>
          <BuyButton onClick={handleAddToCart} green rounded>장바구니에 담기</BuyButton>
          <Alert
            show={showAlert}
            color={isSuccess ? 'primary' : 'danger'}
            setShow={setShowAlert}
            msg={msg}
          />
          {!isDesktop && <CloseBtn onClick={handleClick}>축소</CloseBtn>}
        </BuySect>
      </Container>
    </DyncCont>
  );
};

export default Purchase;
