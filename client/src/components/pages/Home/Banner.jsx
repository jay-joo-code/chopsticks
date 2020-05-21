import React from 'react';
import styled from 'styled-components';
import BannerImg from 'src/assets/images/banners/banner-main.png';
import BannerImg2 from 'src/assets/images/banners/banner-info.png';
import BannerImg3 from 'src/assets/images/banners/banner-event.png';
import BannerImgMobile from 'src/assets/images/banners/banner-main-mobile.png';
import BannerImg2Mobile from 'src/assets/images/banners/banner-info-mobile.png';
import BannerImg3Mobile from 'src/assets/images/banners/banner-event-mobile.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RenderOn from 'src/components/layout/RenderOn';

const Container = styled.div`
  overflow: hidden;
  border-radius: 10px;
  margin-top: 1rem;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
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
      <RenderOn desktop>
        <Slider {...settings}>
            <div>
              <Img src={BannerImg} />
            </div>
            <div>
              <Img src={BannerImg2} />
            </div>
            <div>
              <Img src={BannerImg3} />
            </div>
        </Slider>
      </RenderOn>
      <RenderOn mobile>
        <Slider {...settings}>
          <div>
              <Img src={BannerImgMobile} />
            </div>
            <div>
              <Img src={BannerImg2Mobile} />
            </div>
            <div>
              <Img src={BannerImg3Mobile} />
            </div>
        </Slider>
      </RenderOn>
    </Container>
  )
};

export default Banner;
