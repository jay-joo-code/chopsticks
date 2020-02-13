import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import log from 'src/util/log';
import ItemsList from 'src/components/layout/ItemsList';
import RedButton from 'src/components/common/buttons/RedButton';

const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleSect = styled.div`
  display: flex;
  margin: 2rem 0 .5rem 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #82ab96;
  margin: 0;
`;

const Btn = styled(RedButton)`
  padding: .5rem 1rem;
  border-radius: 15px;
  font-size: .8rem;
`;

const ItemsListComp = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get('/api/item?page=1&limit=4')
      .then((res) => {
        setItems(res.data.docs);
      })
      .catch((e) => {
        log('ERROR fetching items at home', e);
      });
  }, []);
  return (
    <Container>
      <TitleSect>
        <Title>인기 상품</Title>
        <Link to="/browse">
          <Btn green>더보기</Btn>
        </Link>
      </TitleSect>
      <ItemsList items={items} />
      <TitleSect>
        <Title>최신 상품</Title>
        <Link to="/browse">
          <Btn green>더보기</Btn>
        </Link>
      </TitleSect>
      <ItemsList items={items} />
    </Container>
  );
};

export default ItemsListComp;
