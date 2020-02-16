import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from 'src/util/api';
import log from 'src/util/log';
import OrderListCard from 'src/components/common/cards/OrderListCard';
import Btn from 'src/components/common/buttons/Btn';

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: none;
  
  @media(min-width: ${props => props.theme.desktopContentWidth}px) {
    display: block;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
    display: flex;
    align-items: center;
    background: white;
  }
`

const ColHeader = styled.div`
  display: none;
  
  @media(min-width: ${props => props.theme.desktopContentWidth}px) {
    width: ${props => props.width};
    display: flex;
    justify-content: center;
    display: block;
  }
`

const ColText = styled.p`
  display: none;
  
  @media(min-width: ${props => props.theme.desktopContentWidth}px) {
    display: block;
    text-align: center;
  }
`

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Tools = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  & > p {
    padding: 0 .5rem;
  }
`

const SBtn = styled(Btn)`
  opacity: ${props => props.seen ? '.5' : ''};
`

const DynOrderPageIndex = ({ user, state, seen }) => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState([]);
  const [v, setV] = useState(0)
  useEffect(() => {
    if (user && state) {
      const seenQuery = seen ? `&seen=${seen}` : '';
      api.get(`/order/seller/${user._id}?state=${state}${seenQuery}`)
        .then((res) => {
          setOrders(res.data);
          const newSelected = res.data.map((doc) => doc._id);
          setSelected(newSelected);
        })
        .catch((e) => log(`ERROR fetching orders at DynOrderPageIndex`, e))
    }
  }, [state, user, v, seen])
  
  const colWidths = ['2rem', '10rem', '8rem', '8rem', '8rem', '8rem', '8rem', '8rem', '2rem']
  const colNames = ['', '주문번호', '', '상품', '주문일', '택배사', '송장번호', '상태변경', '']
  
  const [allSelected, setAllSelected] = useState(0);
  useEffect(() => {
    if (selected.length === orders.length) setAllSelected(1);
    else setAllSelected(0);
  }, [selected])
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      const allIds = orders.map((doc) => doc._id);
      setSelected(allIds);
    }
    else if (!e.target.checked) {
      setSelected([])
    }
  }
  
  // click handlers
  const seenSelected = () => {
    selected.map((id) => {
      api.put(`/order/${id}/update`, { seen: true })
        .then(() => setV(v + 1))
        .catch((e) => log(`ERROR seenSelected`, e))
    })
  }
  const updateStateSelected = () => {
    const newState = state === 'pending' ? 'delivering' : 'complete';
    selected.map((id) => {
    api.put(`/order/${id}/update`, { state: newState, seen: false })
      .then(() => setV(v + 1))
      .catch((e) => log(`ERROR OrderListCardIndex updateState`, e))
    })
  }
  
  // conditional btn rendering 
  const seenBtn = (
    <SBtn 
      type='button'
      color='primary'
      seen={seen === 'true' ? 1 : 0}
      onClick={seenSelected}
    >확인</SBtn>
    )
  const condBtnText = {
    'pending': '발송완료',
    'delivering': '배송완료'
  }
  const stateChangeBtn = (
    <Btn
      type='button'
      color='primary'
      onClick={updateStateSelected}
    >{condBtnText[state]}</Btn>
    )
  
  const isPending = state === 'pending' && seen === 'true';
  const isDelivering = state === 'delivering';
  const showStateChangeBtn = (isPending || isDelivering);
  const btn = showStateChangeBtn ? stateChangeBtn : seenBtn;
  
  return (
    <Container>
      <TopSection>
        <Tools>
          <input
            type='checkbox'
            checked={allSelected}
            onChange={handleCheckboxChange}
          />
          <p>모두선택</p>
          {btn}
        </Tools>
        <Header>
          {colWidths.map((width, i) => (
            <ColHeader width={width}>
              <ColText>{colNames[i]}</ColText>
            </ColHeader>
          ))}
        </Header>
      </TopSection>
      {orders.map((order) => (
        <OrderListCard
          key={order._id}
          order={order}
          colWidths={colWidths}
          selected={selected}
          setSelected={setSelected}
          v={v}
          setV={setV}
        />
      ))}
    </Container>
  )
};

export default DynOrderPageIndex;
