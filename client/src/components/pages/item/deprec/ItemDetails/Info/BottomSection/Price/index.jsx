import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DynamicInput from 'src/components/common/form/DynamicInput';

const Container = styled.div`

`;

const CostAnalysis = styled.div`
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid grey;
`;

const Name = styled.div`
  opacity: .7;
`;

const Value = styled.div`
  opacity: .8;
  text-align: right;
  display: flex;
  align-items: center;
`;

const FinalPrice = styled.div`
  padding: 2rem 1rem;
  text-align: right;
  color: ${(props) => props.theme.green};
  font-size: 2rem;
`;

const Price = (props) => {
  const [price, setPrice] = useState(props.price);
  const [deliveryCost, setDeliveryCost] = useState(props.deliveryCost);
  const [finalPrice, setFinalPrice] = useState();

  useEffect(() => {
    setPrice(props.price);
  }, [props.price]);

  useEffect(() => {
    setDeliveryCost(props.deliveryCost);
  }, [props.deliveryCost]);

  const parentHandlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const parentHandleDeliveryCostChange = (e) => {
    setDeliveryCost(e.target.value);
  };

  useEffect(() => {
    const number = Number(price) + Number(deliveryCost);
    const formattedNumber = number.toLocaleString();
    setFinalPrice(formattedNumber);
  }, [price, deliveryCost]);

  const quantity = 1;
  return (
    <Container>
      <CostAnalysis>
        <Row>
          <Name>가격</Name>
          <Value>
            <DynamicInput
              name="price"
              init={price}
              updateUrl={`/api/item/${props._id}/update`}
              owner={props.owner}
              parentHandleChange={parentHandlePriceChange}
            />
원
          </Value>
        </Row>
        <Row>
          <Name>배송비</Name>
          <Value>
            <DynamicInput
              name="deliveryCost"
              init={deliveryCost}
              updateUrl={`/api/item/${props._id}/update`}
              owner={props.owner}
              parentHandleChange={parentHandleDeliveryCostChange}
            />
원
          </Value>
        </Row>
        <Row>
          <Name>수량</Name>
          <Value>{quantity}</Value>
        </Row>
      </CostAnalysis>
      <FinalPrice>
        {finalPrice}
원
      </FinalPrice>
    </Container>
  );
};

export default Price;
