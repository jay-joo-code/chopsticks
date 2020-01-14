import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem 0;
  width: 100%;
  
  @media(min-width: ${theme.desktopContentWidth}px) {
    width: 313px;
    padding: 1rem .5rem;
  }
`;

const Wrapper = styled.div`
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);  
  background-color: white;
`;

const ImageContainer = styled.div`
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem .7rem;
  font-size: 1.3rem;
  
  @media(min-width: ${theme.desktopContentWidth}px) {
    font-size: 1rem;
  }
`;

const Name = styled.h3`
  font-weight: bold;
  //color: ${(props) => props.theme.green};
  opacity: .8;
`;

const Price = styled.p`
  // opacity: .8;
  // font-weight: bold;
  color: ${(props) => props.theme.greenAlt};
`;

const ItemCard = (props) => (
  <Link to={`/item/${props._id}`}>
    <Container>
      <Wrapper>
        <ImageContainer>
          <Img src={props.img} />
        </ImageContainer>
        <Info>
          <Name>{props.name}</Name>
          <Price>
            {props.price}
원
          </Price>
        </Info>
      </Wrapper>
    </Container>
  </Link>
);

export default ItemCard;
