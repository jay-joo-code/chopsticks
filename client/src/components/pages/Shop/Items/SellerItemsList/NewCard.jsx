import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import log from 'src/util/log';

const Container = styled.div`
  height: ${theme.CARD_WIDTH}px;
  width: 100%;
  margin: 1rem .5rem;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    width: ${theme.CARD_WIDTH}px;
    height: ${theme.CARD_HEIGHT}px;
  }
`;

const Wrapper = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 3rem;
  font-weight: bold;
  opacity: .8;
`;

const NewCard = () => {
  const userId = useSelector((state) => state.user._id);
  const history = useHistory();
  const handleClick = () => {
    const data = {
      owner: userId,
    };
    axios.post('/api/item/create', data)
      .then((res) => {
        history.push(`/item/${res.data._id}/edit`);
      })
      .catch((e) => {
        log('ERROR failed to create item', e);
      });
  };
  return (
    <Container onClick={handleClick}>
      <Wrapper>
        +
      </Wrapper>
    </Container>
  );
};

export default NewCard;
