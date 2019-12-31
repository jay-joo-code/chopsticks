import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import log from 'src/util/log';
import Card from './Card';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
  opacity: .6;
`;

const ItemCard = () => {
  const userId = useSelector((state) => state.user._id);
  const history = useHistory();
  const handleClick = () => {
    const data = {
      owner: userId,
    };
    axios.post('/api/item/create', data)
      .then((res) => {
        history.push(`/item/${res.data._id}/details`);
      })
      .catch((e) => {
        log('ERROR failed to create item', e);
      });
  };
  return (
    <Card onClick={handleClick}>
      <Container>+</Container>
    </Card>
  );
};

export default ItemCard;
