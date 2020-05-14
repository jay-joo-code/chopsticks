import React from 'react';
import styled from 'styled-components';
import BannerImgBig from 'src/assets/images/main_visual_big.jpg';
import BannerImgMo from 'src/assets/images/main_visual_mo.jpg';
import BannerImg from 'src/assets/images/banner.png';
import theme from 'src/theme';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  overflow: hidden;
  border-radius: 10px;
  margin-top: 1rem;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
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

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
`

const Dots = styled.ul`
  & > li {
    margin: 0;
  }
  & > li > button::before {
    font-size: 12px;
    width: 15px;
  }
  & > li.slick-active button::before {
    color: white;
  }
`

const Banner = () => {
  const appendDots = (dots) => (
    <DotsContainer>
      <Dots>{dots}</Dots>
    </DotsContainer>
  )
  const settings = {
    dots: true,
    appendDots,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Container>
      <Slider {...settings}>
        <div>
          <Img src={BannerImg} />
        </div>
        <div>
          <Img src={BannerImg} />
        </div>
        <div>
          <Img src={BannerImg} />
        </div>
      </Slider>
    </Container>
  )
};

export default Banner;
