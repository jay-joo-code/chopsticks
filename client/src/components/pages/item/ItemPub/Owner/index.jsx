import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import Body from 'src/components/common/fonts/Body';
import { ReactComponent as ArrowRaw } from 'src/assets/svgs/arrow.svg';
import RenderOn from 'src/components/layout/RenderOn';
import DefaultImg from 'src/assets/images/shop_default_img.png';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    margin: 0;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  white-space: pre-line;
  word-break: break-word;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    padding: 2rem 0;
    display: block;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  object-fit: scale-down;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    width: 10rem;
    height: 10rem;
  }
  
`;

const TextCont = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    display: block;
    margin: 0;
  }
`;

const Name = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #de6362;
  text-align: center;
  margin: 0 0 .5rem 0;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    margin: 1rem 0;
  }
`;

const IntroSection = styled.div`
  display: flex;
  align-items: flex-start;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    justify-content: center;
  }
`

const Intro = styled(Body)`
  opacity: .8;
  margin: 0;
  font-size: .8rem;
  line-height: 1.4;
  
  // mobile - compressed
  cursor: pointer;
  flex-shrink: 1;
  padding-right: .5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  // mobile - expanded
  display: ${props => props.expandIntro ? 'inline' : ''};
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    text-align: center;
    
    // remove expand option
    cursor: auto;
    flex-shrink: 0;
    padding-right: 0;
    -webkit-line-clamp: 11;
    
    white-space: pre-line;
    word-break: break-word;
    max-width: 100%;
    
    max-width: 310px;
  }
`;

const Arrow = styled(ArrowRaw)`
  width: 50px;
  transform: rotate(90deg);
  transform: ${props => props.expandIntro ? 'rotate(-90deg)' : ''};
`

const Owner = ({ item }) => {
  const src = item.owner.shop.image;
  const [expandIntro, setExpandIntro] = useState(false);
  
  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Img src={src || DefaultImg} default={!src} />
        </ImgContainer>
        <TextCont>
          <Name>{`@${item.owner.shop.title}`}</Name>
          <IntroSection onClick={() => setExpandIntro(!expandIntro)}>
            <Intro 
              expandIntro={expandIntro} 
            >{item && item.owner && item.owner.shop.intro}</Intro>
            <RenderOn mobile>
              <Arrow expandIntro={expandIntro} />
            </RenderOn>
          </IntroSection>
        </TextCont>
      </Wrapper>
    </Container>
  );
};

export default Owner;
