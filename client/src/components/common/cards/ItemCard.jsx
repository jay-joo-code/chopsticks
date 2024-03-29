import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import { Link } from 'react-router-dom';
import { isSoldout } from 'src/util/helpers';

const Cont = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: 1rem .5rem 0 .5rem;
  
  @media (min-width: ${theme.CARD_WIDTH}px) {
    width: ${theme.CARD_WIDTH}px;
  }
`;

const StyleArea = styled.div`
  position: absolute;
  top: .5rem;
  left: .5rem;
  border-radius: 30px;
  font-size: 1rem;
  color: ${(props) => props.theme.red};
  font-weight: 600;
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  font-size: .6rem;
  padding: .2rem .5rem;
`;

const SoldoutArea = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  
  display: flex;
  justify-content: center;
  align-items: center;
`

const Soldout = styled.p`
  color: black;
  font-size: 1.2rem;
`

const ImgSect = styled.div`
  position: relative;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: ${theme.CARD_HEIGHT}px;
  
  // soldout
  opacity: ${props => props.soldout ? '.6' : ''};
`;

const TextSect = styled.div`
  padding: 8px 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;  
  font-size: .9rem;
  line-height: 1.2rem;
  height: 5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Name = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: .8rem;
  word-break: break-word;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SoldoutPublic = styled.p`
  font-size: .8rem;
  flex-shrink: 0;
  white-space: nowrap;
`

const Owner = styled.p`
  color: ${(props) => props.theme.red};
  opacity: .9;
  font-size: .8rem;
`;

const Price = styled.p`
  color: black;
  flex-shrink: 0;
`;

const ItemCard = ({ onClickPath, item, seller, ...rest }) => {
  const path = onClickPath || `/item/${item._id}`;
  const src = item.image;
  const styledPrice = item.price.toLocaleString();
  const soldout = isSoldout(item);

  return (
    <Cont>
      <Link to={path}>
        <ImgSect>
          <Img src={src} soldout={seller && soldout} />
          <StyleArea>
            <p>{item.style}</p>
          </StyleArea>
          {(seller && soldout) &&
            <SoldoutArea>
              <Soldout>Sold Out</Soldout>
            </SoldoutArea>
          }
        </ImgSect>
        <TextSect>
          <Row>
            <Owner>{`@${item.owner.shop.title}`}</Owner>
            <Price>{`${styledPrice}원`}</Price>
          </Row>
          <Row>
            <Name>{item.name}</Name>
            {(!seller && soldout) && <SoldoutPublic>Sold Out</SoldoutPublic>}
          </Row>
        </TextSect>
      </Link>
    </Cont>
  );
};

export default ItemCard;
