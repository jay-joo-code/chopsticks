import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem 0;
  width: 100%;
  
  @media(min-width: ${theme.desktopContentWidth}px) {
    width: 313px;
    padding: 2rem .5rem;
  }
`;

const ImageContainer = styled.div`
  border-radius: 10px;
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
  padding-top: 1rem;
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
  opacity: .8;
`;

const ItemCard = (props) => (
  <Link to={`/item/${props._id}`}>
    <Container>
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
    </Container>
  </Link>
);

export default ItemCard;
