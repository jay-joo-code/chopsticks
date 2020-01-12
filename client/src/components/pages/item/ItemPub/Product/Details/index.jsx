import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex-grow: 4;
  display: flex;
  justify-content: center;
`;

const Details = ({ item }) => {
  const primarySrc = item.images[item.primaryImageIndex];
  return (
    <Container>
      <div className="detail_content">
        <div className="video">
          <img src={primarySrc} />
        </div>
        <div className="img_txt">
          <p className="txt">{item.content}</p>
        </div>
      </div>
    </Container>
  );
};

export default Details;
