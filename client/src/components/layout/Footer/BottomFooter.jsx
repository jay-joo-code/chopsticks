import React from 'react';
import styled from 'styled-components';
import DynamicContainer from 'src/components/layout/DynamicContainer';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`
  padding: 2rem 0;
`;

const StyledBody = styled(Body)`
  font-size: .8rem;
  margin-bottom: .2rem !important;
`

const Row = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
`

const BottomFooter = () => {
  return (
    <Container>
      <DynamicContainer>
        <StyledBody>상호: 찹스틱스ㅣ대표: 서강석 ㅣ 개인정보관리책임자: 서강석ㅣ전화: 070-4879-3425ㅣ이메일: service@chopsticks.market</StyledBody>
        <StyledBody>주소: 서울시 송파구 올림픽로 45길 11ㅣ사업자등록번호: 247-71-00273ㅣ통신판매: 2019-서울송파-2416</StyledBody>
        <Row>
          <div>
            <StyledBody>찹스틱스는 통신판매중개자이며 통신판매의 당사자가 아닙니다.</StyledBody>
            <StyledBody>찹스틱스는 상품 거래정보 및 거래 등에 대하여 책임을 지지 않습니다.</StyledBody>
          </div>
          <StyledBody>Copyright © 2020 Chopsticks All rights reserved.</StyledBody>
        </Row>
      </DynamicContainer>
    </Container>
  )
};

export default BottomFooter;
