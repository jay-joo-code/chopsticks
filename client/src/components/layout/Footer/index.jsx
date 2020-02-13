import React from 'react';
import styled from 'styled-components';
import useCategories from 'src/util/hooks/useCategories';
import { ReactComponent as Facebook } from 'src/assets/svgs/facebook.svg';
import { ReactComponent as Instagram } from 'src/assets/svgs/instagram.svg';
import { Link } from 'react-router-dom';

const Container = styled.div`

`;

const BottomSect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
  opacity: .8;
`;

const Row = styled.div`
  margin: .5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #44423f;
  margin-bottom: 12px;
`;

const Footer = () => {
  const categories = useCategories();
  return (
    <Container>
      <footer id="footer">
        <div id="footerin">
          <a href="/" className="logo pc">
                chopsticks
          </a>
          <ul className="f_nav">
            <li>
              <Title className="tlt">카테고리</Title>
              <ul className="in_list">
                {categories.map((cat) => (
                  <li key={cat.name}><Link to={`/browse?category=${cat.name}`}>{cat.korean}</Link></li>
                ))}
              </ul>
            </li>
            <li>
              <Title className="tlt">HELP / INFO</Title>
              <ul className="in_list">
                <li><Link to="/terms/use">이용약관</Link></li>
                <li><Link to="/terms/privacy">개인정보 처리방</Link></li>
              </ul>
            </li>
          </ul>
          <div className="sns">
            <Title className="tlt">Follow Us</Title>
            <ul>
              <li><a href="" target="_blank"><Facebook /></a></li>
              <li><a href="https://www.instagram.com/chopsticks.market/" target="_blank"><Instagram /></a></li>
            </ul>
          </div>
        </div>
        <BottomSect>
          <Row>
            <p>상호: 찹스틱스ㅣ대표: 서강석 ㅣ 개인정보관리책임자: 서강석ㅣ전화: 010-9939-2527ㅣ이메일: service@chopsticks.market</p>
            <p>주소: 서울시 송파구 올림픽로 45길 11 1-1008ㅣ사업자등록번호: 247-71-00273ㅣ통신판매: 2019-서울송파-2416</p>
          </Row>
          <Row>
            <p>chopsticks는 통신판매중개자이며 통신판매의 당사자가 아닙니다.</p>
            <p>따라서 개별 판매자가 등록하여 판매한 모든 상품에 대한 거래 정보 및 거래에 대한 책임은 각 판매자가 부담하고, 이에 대하여 chopsticks는 일체 책임지지 않습니다.</p>
          </Row>
          <Row>
            <p>Copyright 2019 chopsticks All rights reserved.</p>
          </Row>
        </BottomSect>
      </footer>
    </Container>
  );
};

export default Footer;
