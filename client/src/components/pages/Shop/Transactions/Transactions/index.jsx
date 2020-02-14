import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from 'src/components/common/fonts/Title';
import Card from 'src/components/common/cards/Card';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  
  @media(min-width: ${props => props.theme.desktopContentWidth}px) {
    width: 60%;
  }
`;

const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  font-weight: bold;
`

const MonthSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
`

const Arrow = styled.button`
  margin: 0 .5rem;
  opacity: .6;
  background: inherit;
`

const Month = styled.p`
  font-weight: bold;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: .5rem 1rem;
  width: 100%;
  color: ${props => props.primary ? props.theme.primary : ''};
`

const HrLine = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, .2);
  margin: 1rem 0;
  width: 100%;
`

const Label = styled.p`
  opacity: .8;
`

const Value = styled.p`
  
`

const Transactions = ({ orders, monthIndex, setMonthIndex }) => {
  const [count, setCount] = useState();
  const [total, setTotal] = useState();
  useEffect(() => {
    setCount(orders.length);
    const updatedTotal = orders.reduce((acc, cur) => acc + Number(cur.cartObj.price), 0);
    const totalStr = updatedTotal.toLocaleString();
    setTotal(totalStr)
  }, [orders])
  const changeMonth = (val) => {
    let newIndex = monthIndex + val;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > 11) newIndex = 11;
    setMonthIndex(newIndex);
  };
  
  return (
    <Wrapper>
      <Container>
        <Title>매출 / 정산</Title>
        <Card>
          <CardInner>
            <MonthSection>
              <Arrow 
                type='button'
                onClick={() => changeMonth(-1)}
              >{`<`}</Arrow>
              <Month>{`${monthIndex + 1}월`}</Month>
              <Arrow 
                type='button'
                onClick={() => changeMonth(1)}
              >{`>`}</Arrow>
            </MonthSection>
            <Row>
              <Label>완료된 주문건</Label>
              <Value>{count}</Value>
            </Row>
            <Row>
              <Label>총 매출</Label>
              <Value>{`${total}원`}</Value>
            </Row>
            <HrLine />
            <Row primary>
              <Label>정산 금액</Label>
              <Value>{`${total}원`}</Value>
            </Row>
          </CardInner>
        </Card>
      </Container>
    </Wrapper>
  )
};

export default Transactions;
