import React from 'react';
import styled from 'styled-components';
import Intro from './Intro';

const Container = styled.div`
  flex-grow: 4;
  display: flex;
  justify-content: center;
`;

const Details = ({ item }) => (
  <Container>
    <div className="detail_content">
      <div className="video">
        <img src={item.image} alt="item primary image" />
      </div>
      <div className="img_txt">
        <p className="txt">{item.content}</p>
      </div>
      <Intro item={item} />
    </div>
  </Container>
);

export default Details;
