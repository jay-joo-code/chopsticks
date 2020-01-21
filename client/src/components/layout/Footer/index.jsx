import React from 'react';
import styled from 'styled-components';
import useCategories from 'src/util/hooks/useCategories';
import { ReactComponent as Facebook } from 'src/assets/svgs/facebook.svg';
import { ReactComponent as Instagram } from 'src/assets/svgs/instagram.svg';
import { Link } from 'react-router-dom';

const Container = styled.div`

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
                <li><Link to="/terms/use">Terms & conditions</Link></li>
                <li><Link to="/terms/privacy">Privacy & cookie policy</Link></li>
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
      </footer>
    </Container>
  );
};

export default Footer;
