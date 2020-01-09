import React from 'react';
import styled from 'styled-components';
import placeholder from 'src/assets/images/placeholders/ph2.jpg';

const Container = styled.div`
  flex-grow: 4;
`;

const Details = () => (
  <Container>
    <div className="detail_content">
      <div className="video">
        <img src={placeholder} />
      </div>
      <div className="img_txt">
        <p className="img">
          <img src={placeholder} />
        </p>
        <p className="txt">
                            I love it !, just a comment, in the photo the necklace had 3 colors, black, gold and white,
                            however the necklace I received was only black with gold. Anyway, it's beautiful!
        </p>
        <p className="img">
          <img src={placeholder} />
        </p>
        <p className="img">
          <img src={placeholder} />
        </p>
      </div>
    </div>
  </Container>
);

export default Details;
