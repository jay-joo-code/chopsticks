import React, { useState, useEffect } from 'react';
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
  align-items: center;
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

const OptString = styled(Body)`
  margin-top: 1rem;
`

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
  const [msg, setMsg] = useState('');
  
  // opts
  const emptyOptionsIndex = Array(item.optGrps.length).fill(null);
  const [optionsIndex, setOptionsIndex] = useState(emptyOptionsIndex);
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
        setOptionsIndex(emptyOptionsIndex);
      }
    }
    else {
      setSelectedOpt(null)
    }
  }, [optionsIndex])
  
  // add to cart
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const handleAddToCart = () => {
    // validation
    if (!user) {
      history.push('/login');
      return;
    }
    
    // 재고 validation
    if (!item.madeOnOrder) {
      if (item.optData.length !== 0) {
        // 옵션 재고
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
        else if (selectedOpt.qty === 0) {
          setIsSuccess(false);
          setMsg('선택하신 옵션이 재고가 없습니다. 다른 옵션을 선택해주세요')
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
      item: item._id,
      optionsIndex,
      quantity: 1,
      optString: selectedOpt ? selectedOpt.optString : '옵션 없음',
      diff: selectedOpt ? selectedOpt.diff : 0
    };
    axios.post(`/api/user/${user._id}/cart/add`, { cartObj })
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
                    // this means this opt combination was deleted by user
                    if (!dispStr) return null;
                  }
                  else {
                    dispStr = opt;
                  }
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
        <OptString>{selectedOpt && formatOptStr(selectedOpt)}</OptString>
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
