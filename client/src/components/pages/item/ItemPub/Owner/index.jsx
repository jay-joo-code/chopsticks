import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import Body from 'src/components/common/fonts/Body';
import { ReactComponent as ArrowRaw } from 'src/assets/svgs/arrow.svg';

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
    max-width: 200px;
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
`

const Intro = styled(Body)`
  opacity: .8;
  margin: 0;
  font-size: .8rem;
  
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
    text-overflow: none;
    display: inline;
    -webkit-line-clamp: none;
    -webkit-box-orient: auto;
    
    white-space: pre-line;
    word-break: break-word;
    max-width: 100%;
    
  }
`;

const Arrow = styled(ArrowRaw)`
  width: 50px;
  transform: rotate(90deg);
  transform: ${props => props.expandIntro ? 'rotate(-90deg)' : ''};
`

const Owner = ({ item }) => {
  const src = item.owner.shop.image;
  const defaultSrc = 'https://firebasestorage.googleapis.com/v0/b/chopsticks-248516.appspot.com/o/users%2F5e1eb49698c4320017334663%2F%ED%88%AC%EB%AA%85%20%EB%A1%9C%EA%B3%A0.png?alt=media&token=a1c77c2b-ec8d-4136-9e63-087dcb7a7315';
  const [expandIntro, setExpandIntro] = useState(false);
  
  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Img src={src || defaultSrc} default={!src} />
        </ImgContainer>
        <TextCont>
          <Name>{`@${item.owner.shop.title}`}</Name>
          <IntroSection onClick={() => setExpandIntro(!expandIntro)}>
            <Intro 
              expandIntro={expandIntro} 
            >{item && item.owner && item.owner.shop.intro}</Intro>
            <Arrow expandIntro={expandIntro} />
          </IntroSection>
        </TextCont>
      </Wrapper>
    </Container>
  );
};

export default Owner;