import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from 'src/components/common/cards/Card';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`;

const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  font-weight: bold;
`;

const MonthSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
`;

const Arrow = styled.button`
  padding: 0 .5rem;
  opacity: .6;
  background: inherit;
`;

const Month = styled.p`
  font-weight: bold;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: .5rem;
  width: 100%;
  color: ${(props) => (props.primary ? props.theme.primary : '')};
`;

const HrLine = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, .2);
  margin: 1rem 0;
  width: 100%;
`;

const Label = styled.p`
  opacity: .8;
  font-size: ${(props) => (props.sm ? '.7rem' : '')};
  margin-bottom: ${(props) => (props.sm ? '1rem' : '')};
`;

const Value = styled.p`
  
`;

const RevenueByMonth = ({ orders, monthIndex, setMonthIndex }) => {
  const [count, setCount] = useState();
  const [total, setTotal] = useState();
  const excludedStates = ['canceled', 'refunded'];

  const computeOrderData = (orders) => {
    const completeOrders = orders.filter((order) => !excludedStates.includes(order.state));
    const updatedTotal = completeOrders.reduce((acc, cur) => acc + Number(cur.cartObj.price), 0);
    const total = updatedTotal.toLocaleString();
    return {
      total,
      count: completeOrders.length,
    }
  }

  useEffect(() => {
    const { total, count } = computeOrderData(orders);
    setTotal(total);
    setCount(count);
  }, [orders]);
  
  const changeMonth = (val) => {
    let newIndex = monthIndex + val;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > 11) newIndex = 11;
    setMonthIndex(newIndex);
  };

  return (
    <Wrapper>
      <Container>
        <Card>
          <CardInner>
            <MonthSection>
              <Arrow
                type="button"
                onClick={() => changeMonth(-1)}
              >
                {'<'}
              </Arrow>
              <Month>{`${monthIndex + 1}월`}</Month>
              <Arrow
                type="button"
                onClick={() => changeMonth(1)}
              >
                {'>'}
              </Arrow>
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
            <Label sm>정산금액은 총 매출에서 거래별 수수료, 카드수수료 등을 제외한 실 수령 금액이며,</Label>
            <Label sm>추후에 표시될 예정입니다.</Label>
          </CardInner>
        </Card>
      </Container>
    </Wrapper>
  );
};

/*
<Row primary>
  <Label>정산 금액</Label>
  <Value>{`${total}원`}</Value>
</Row>
*/

export default RevenueByMonth;
