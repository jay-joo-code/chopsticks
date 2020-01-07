import React from 'react';
import styled from 'styled-components';
import Select from 'src/components/common/form/Select';
import RedButton from 'src/components/common/buttons/RedButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  opacity: .8;
  
`

const Price = styled.div`
font-size: 3rem;
        font-weight: bold;
        color: ${props => props.theme.green};
  margin: 2rem 0;
`

const BuySect = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
`

const BuyButton = styled(RedButton)`
  margin: .5rem 0;
`

const Purchase = () => (
  <Container>
    <Name>
        Pressed flowers frame
    </Name>
    <Price>
        $12.00
    </Price>
    <p class="option">
        <Select>
            <option>Select Option</option>
            <option>Select Option</option>
            <option>Select Option</option>
            <option>Select Option</option>
        </Select>
    </p>
    <BuySect>
        <BuyButton white rounded>즉시 구매</BuyButton>
        <BuyButton green rounded>장바구니에 담기</BuyButton>
    </BuySect>
  </Container>
);

export default Purchase;
