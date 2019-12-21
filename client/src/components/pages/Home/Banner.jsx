import React from 'react';
import styled from 'styled-components';
import BannerImgBig from 'src/assets/images/main_visual_big.jpg';
import BannerImgMo from 'src/assets/images/main_visual_mo.jpg';
import theme from 'src/theme';

const Container = styled.div`
  overflow: hidden;
  border-radius: 10px;
  margin-top: 1rem;
`;

const Img = styled.img`
  width: 100%;
  height: auto
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
`;

const ImgMo = styled(Img)`
  @media(min-width: ${theme.desktopContentWidth}px) {
    display: none;
  }
`;

const ImgBig = styled(Img)`
  display: none;
  @media(min-width: ${theme.desktopContentWidth}px) {
    display: block;
  }
`;

const Banner = () => (
  <Container>
    <ImgMo src={BannerImgMo} alt="banner image" />
    <ImgBig src={BannerImgBig} alt="banner image" />
  </Container>
);

export default Banner;
