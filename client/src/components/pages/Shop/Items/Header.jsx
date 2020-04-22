import React from 'react';
import styled from 'styled-components';
import HeadingRaw from 'src/components/common/fonts/Heading';
import Body from 'src/components/common/fonts/Body';
import { isSoldout } from 'src/util/helpers';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    flex-direction: row;
  }
`

const Heading = styled(HeadingRaw)`
  margin: 0 2rem 1rem 0;
`

const Guidelines = styled.div`
  padding: .2rem;
  background-color: #ffe599;
  border: 1px solid rgba(0, 0, 0, .2);
`

const StatsSection = styled.div`
  margin-top: 1rem;
`

const Stats = styled(Body)`
  margin-bottom: .5rem;
  padding: 0 .5rem;
`

const Header = ({ items }) => {
  const displayedCount = items.filter((item) => item.display).length;
  const soldOutCount = items.filter((item) => isSoldout(item)).length;
  
  return (
    <Container>
      <LeftContainer>
        <Heading>상품</Heading>
        <Guidelines>
          <Body muted>※ 상품리스트에 노출시켜 판매할 수 있는 상품은 최대 7개 입니다.</Body>
          <Body muted>※ 동일한 상품에 사이즈, 컬러 등의 다양한 옵션이 있는 경우. 상품에 옵션을 추가해서 하나의 상품으로 등록해 주세요 .</Body>
        </Guidelines>
      </LeftContainer>
      <StatsSection>
        <table>
          <tbody>
            <tr>
              <td><Stats>등록상품</Stats></td>
              <td><Stats>{items.length}</Stats></td>
            </tr>
            <tr>
              <td><Stats>판매중</Stats></td>
              <td><Stats>{displayedCount} / 7</Stats></td>
            </tr>
            <tr>
              <td><Stats>Sold Out</Stats></td>
              <td><Stats>{soldOutCount}</Stats></td>
            </tr>
          </tbody>
        </table>
      </StatsSection>
    </Container>
  )
};

export default Header;
