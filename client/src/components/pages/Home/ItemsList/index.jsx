import React from 'react';
import styled from 'styled-components';
import TestImg from 'src/assets/images/item/handmade.jpg';
import ItemCard from 'src/components/common/cards/ItemCard';

const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-wrap: wrap;
`;

const testData = [{
  _id: '123',
  name: '푸른 빛 양초',
  price: '15000',
  img: TestImg,
}, {
  _id: '456',
  name: '개나리 색 물결',
  price: '20000',
  img: TestImg,
}, {
  _id: '456',
  name: '개나리 색 물결',
  price: '20000',
  img: TestImg,
}, {
  _id: '456',
  name: '개나리 색 물결',
  price: '20000',
  img: TestImg,
}, {
  _id: '456',
  name: '개나리 색 물결',
  price: '20000',
  img: TestImg,
}];

const ItemsList = () => (
  <Container>
    {testData.map((item) => (
      <ItemCard id={item._id} {...item} />
    ))}
  </Container>
);

export default ItemsList;
