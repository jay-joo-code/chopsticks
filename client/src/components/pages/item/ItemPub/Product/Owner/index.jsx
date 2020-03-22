import React from 'react';
import styled from 'styled-components';
import placeholder from 'src/assets/images/placeholders/ph1.jpg';
import theme from 'src/theme';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    width: auto;
    display: block;
    width: 20%;
    margin-bottom: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 200px;
  white-space: pre-line;
  word-break: break-word;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    padding: 2rem 0;
    margin: 0 1rem 0 0;
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
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    width: 8rem;
    height: 8rem;
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
  font-size: 1rem;
  font-weight: 600;
  color: #de6362;
  text-align: center;
  margin: 0 0 .5rem 0;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    margin: 1rem 0;
  }
`;

const Intro = styled.p`
  opacity: .8;
  text-align: center;
  margin: 0;
  text-overflow: ellipsis;
`;

const Owner = ({ item }) => {
  const email = item && item.owner ? item.owner.email : '';
  const src = item.owner.shop.image;
  const defaultSrc = 'https://firebasestorage.googleapis.com/v0/b/chopsticks-248516.appspot.com/o/users%2F5e1eb49698c4320017334663%2F%ED%88%AC%EB%AA%85%20%EB%A1%9C%EA%B3%A0.png?alt=media&token=a1c77c2b-ec8d-4136-9e63-087dcb7a7315';

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Img src={src || defaultSrc} default={!src} />
        </ImgContainer>
        <TextCont>
          <Name>{`@${item.owner.shop.title}`}</Name>
          <Intro>{item && item.owner && item.owner.shop.intro}</Intro>
        </TextCont>
      </Wrapper>
    </Container>
  );
};

export default Owner;
