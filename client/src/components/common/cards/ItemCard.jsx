import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import { Link } from 'react-router-dom';
import { ReactComponent as Star } from 'src/assets/svgs/star.svg';

const Cont = styled.div`
  width: ${theme.CARD_WIDTH}px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  margin: 0 .5rem;
`

const Stars = styled.div`
  position: absolute;
  top: .5rem;
  right: .5rem;
  border-radius: 30px;
  font-size: 1rem;
  color: #66c088;
  font-weight: 600;
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  font-size: .6rem;
  padding: .2rem .5rem;
`

const StyledStar = styled(Star)`
  height: .6rem;
  width: .6rem;
  margin-right: .2rem;
`

const ImgSect = styled.div`
  height: 0px;
  padding-bottom: 85%;
  overflow: hidden;
  position: relative;
`

const Img = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  transform: translate(-50%,-50%);
`

const TextSect = styled.div`
  padding: 8px 0px 10px;
`

const Name = styled.p`
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.45px;
  color: #000000;
`

const Owner = styled.p`
  letter-spacing: 0.36px;
  text-align: center;
  color: #de6362;
  margin: 1rem 0;
  font-weight: 600;
`

const Price = styled.p`
  font-weight: 600;
  text-align: center;
  color: #7a8680;
`

const ItemCard = ({ onClickPath, item, ...rest }) => {
  const path = onClickPath || `/item/${item._id}`;
  const src = item.images[item.primaryImageIndex];
  const ownerId = item.owner.email.split('@')[0]
  return (
    <Cont>
    <Link to={path}>
      <ImgSect>
          <Img src={src} />
          <Stars><StyledStar />4.5</Stars>
      </ImgSect>
      <TextSect>
          <Name>{item.name}</Name>
          <Owner>@{ownerId}</Owner>
          <Price>{item.price}원</Price>
      </TextSect>
  </Link>
  </Cont>
  );
};

export default ItemCard;
