import React from 'react';
import styled from 'styled-components';
import placeholder from 'src/assets/images/placeholders/ph1.jpg';
import theme from 'src/theme';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    width: auto;
    display: block;
    width: 20%;
  }
`;

const Wrapper = styled.div`
  padding: 2rem 0;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    margin: 0 1rem 0 0;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ImgWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  border-radius: 50%;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    width: 8rem;
    height: 8rem;
  }
`;

const Img = styled.img`
  height: 100%;
`;

const Name = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #de6362;
  text-align: center;
  margin: 1rem 0;
`;

const Intro = styled.p`
  opacity: .8;
  text-align: center;
`;

const Owner = ({ item }) => {
  const email = item && item.owner ? item.owner.email : '';
  const id = email.split('@')[0];

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <ImgWrapper>
            <Img src={placeholder} />
          </ImgWrapper>
        </ImgContainer>
        <Name>
@
          {id}
        </Name>
        <Intro>{item && item.owner && item.owner.shop.intro}</Intro>
      </Wrapper>
    </Container>
  );
};

export default Owner;