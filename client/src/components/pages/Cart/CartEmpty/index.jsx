import React from 'react';
import styled from 'styled-components';
import Title from 'src/components/common/fonts/Title';
import Body from 'src/components/common/fonts/Body';
import RedButton from 'src/components/common/buttons/RedButton';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const BodyCont = styled.div`
  margin: 1rem 0 2rem 0;
`

const CartEmpty = () => {
  return (
    <Container>
      <Title>카트에 담긴 상품이 없습니다</Title>
      <BodyCont>
        <Body>새로운 디자인 상품을 찾아보아요</Body>
      </BodyCont>
      <Link to='/'>
        <RedButton green>홈으로 돌아가기</RedButton>
      </Link>
    </Container>
  )
};

export default CartEmpty;
