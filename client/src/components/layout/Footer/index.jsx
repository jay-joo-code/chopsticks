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
`

const Footer = () => {
  const categories = useCategories();
  return (
    <Container>
        <footer id="footer">
        <div id="footerin">
            <a href="/" class="logo pc">
                chopsticks
            </a>
            <ul class="f_nav">
                <li>
                    <Title class="tlt">카테고리</Title>
                    <ul class="in_list">
                      {categories.map((cat) => (
                        <li><Link to={`/browse?category=${cat.name}`}>{cat.korean}</Link></li>
                      ))}
                    </ul>
                </li>
                <li>
                    <Title class="tlt">HELP / INFO</Title>
                    <ul class="in_list">
                        <li><Link to='/terms/use'>Terms & conditions</Link></li>
                        <li><Link to='/terms/privacy'>Privacy & cookie policy</Link></li>
                    </ul>
                </li>
            </ul>
            <div class="sns">
                <Title class="tlt">Follow Us</Title>
                <ul>
                    <li><a href="" target='_blank'><Facebook /></a></li>
                    <li><a href="https://www.instagram.com/chopsticks.market/" target='_blank'><Instagram /></a></li>
                </ul>
            </div>
        </div>
    </footer>
    </Container>
  )
};

export default Footer;
