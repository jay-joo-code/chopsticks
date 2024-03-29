import React from 'react';
import styled from 'styled-components';
import log from 'src/util/log';
import api from 'src/util/api';
import { useSelector, useDispatch } from 'react-redux';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import theme from 'src/theme';
import { Link } from 'react-router-dom';
import getTotalPrice from 'src/util/calculation/getTotalPrice';
import ActionsSection from './ActionsSection';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`;

const TopData = styled.div`
  overflow: hidden;
  flex-grow: 0;
  padding-right: 1rem;
`

const TopActionSection = styled.div`
  flex-shrink: 0;
`

const Name = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  opacity: .9;
  margin-bottom: .5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Owner = styled.div`
  color: ${(props) => props.theme.red};
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    flex-direction: row;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Price = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.theme.green};
`;

const QtyCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    margin-right: 2rem;
  }
`;

const QtyInput = styled.input`
  width: 50px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, .1);
  padding: 2px;
`;

const OptElt = styled.p`
  margin-bottom: .5rem;
  opacity: .8;
`;

const PriceCalc = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PriceCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Muted = styled.p`
  opacity: .8;
  font-size: .7rem;
  margin: 0 .1rem .4rem 0;
`;

const ItemInfo = ({
  cartObj, order, setV, v,
}) => {
  const user = useSelector((state) => state.user);
  const { item, quantity, optString, diff, optionsIndex } = cartObj;
  const totalPrice = getTotalPrice(cartObj);
  const dispatch = useDispatch();

  const findOptByIndex = (searchIndex) => {
    const foundOpt = item.optData.filter((opt, i) => {
      return opt.index.join() === searchIndex.join();
    });
    return foundOpt.length !== 0 ? foundOpt[0] : null;
  }

  const handleQtyChange = (e) => {
    const quantity = Number(e.target.value);

    // 재고 validation
    let hasStockError = false;
    if (!item.madeOnOrder) { 
      if (item.optData.length !== 0) {
        // 옵션 재고
        const opt = findOptByIndex(optionsIndex);
        console.log('opt', opt);
        if (quantity > opt.qty) {
          hasStockError = true;
        }
      }
      else { 
        // 상품 재고
        if (quantity > item.stock) {
          hasStockError = true;
        }  
      }
    }

    if (hasStockError) {
      dispatch({
        type: 'ALERT_SET',
        payload: {
          show: true,
          color: 'danger',
          msg: '상품 최대 재고입니다'
        }
      })
      return;
    }

    const data = { ...cartObj, quantity, };
    api.put(`/user/${user._id}/cart/update/cartobj`, { cartObj: data })
      .then((res) => {
        fetchSelfAndStore(user._id);
      })
      .catch((e) => {
        log('ERROR update cartobj quantity', e);
      });
  };

  return (
    <Container>
      <Top>
        <TopData>
          <Link to={`/item/${item._id}`}>
            <Name>{item.name}</Name>
          </Link>
          <Owner>{`@${item.owner.shop.title}`}</Owner>
        </TopData>
        <TopActionSection>
          <ActionsSection
            order={order}
            user={user}
            setV={setV}
            v={v}
            cartObj={cartObj}
          />
        </TopActionSection>
      </Top>
      <Bottom>
        <Options>
          {optString && <Body>{`${optString} (+ ${diff})`}</Body>}
        </Options>
        <PriceCalc>
          <QtyCont>
            <Muted>수량</Muted>
            {order
              ? <p>{quantity}</p>
              : (
                <QtyInput
                  type="number"
                  value={quantity}
                  onChange={handleQtyChange}
                />
              )}
          </QtyCont>
          <PriceCont>
            <Muted>{`배송비: ${item.deliveryCost}원`}</Muted>
            <Price>
              {`${totalPrice.toLocaleString()}원`}
            </Price>
          </PriceCont>
        </PriceCalc>
      </Bottom>
    </Container>
  );
};

export default ItemInfo;
