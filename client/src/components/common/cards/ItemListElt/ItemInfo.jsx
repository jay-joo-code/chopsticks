import React from 'react';
import styled from 'styled-components';
import log from 'src/util/log';
import api from 'src/util/api';
import { useSelector } from 'react-redux';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import theme from 'src/theme';
import { Link } from 'react-router-dom';
import getTotalPrice from 'src/util/calculation/getTotalPrice';
import ActionsSection from './ActionsSection';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  opacity: .9;
  margin-bottom: .5rem;
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
  const { item, quantity, optionsIndex } = cartObj;
  const totalPrice = getTotalPrice(cartObj);

  const handleQtyChange = (e) => {
    const data = { ...cartObj, quantity: e.target.value };
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
        <div>
          <Link to={`/item/${item._id}`}>
            <Name>{item.name}</Name>
          </Link>
          <Owner>{`@${item.owner.shop.title}`}</Owner>
        </div>
        <ActionsSection
          order={order}
          user={user}
          setV={setV}
          v={v}
          cartObj={cartObj}
        />
      </Top>
      <Bottom>
        <Options>
          {item.optGrps && item.optGrps.map((optGrp, i) => {
            const opt = optGrp.opts[optionsIndex[i]]
            return opt && <OptElt key={optGrp.title}>{`${opt.name} (+ ${opt.diff}원)`}</OptElt>
          })}
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
