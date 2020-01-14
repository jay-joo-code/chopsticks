import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import { useHistory } from 'react-router-dom';
import Card from './Card';
import dimensions from './dimensions';

const ImageContainer = styled.div`
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: ${dimensions.IMG_HEIGHT}px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .7rem;
  flex-grow: 1;
  font-size: 1.3rem;
  
  @media(min-width: ${theme.desktopContentWidth}px) {
    font-size: 1rem;
  }
`;

const Name = styled.h3`
  font-weight: bold;
  opacity: .8;
`;

const Price = styled.p`\
  color: ${(props) => props.theme.greenAlt};
`;

const ItemCard = (props) => {
  const { onClickPath } = props;
  const history = useHistory();
  const path = onClickPath || `/item/${props._id}`;
  const handleClick = () => {
    history.push(path);
  };
  return (
    <Card onClick={handleClick} {...props}>
      <ImageContainer>
        <Img src={props.images[props.primaryImageIndex]} />
      </ImageContainer>
      <Info>
        <Name>{props.name}</Name>
        <Price>
          {props.price}
원
        </Price>
      </Info>
    </Card>
  );
};

export default ItemCard;
