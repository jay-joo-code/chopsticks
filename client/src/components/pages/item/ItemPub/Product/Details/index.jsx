import React from 'react';
import styled from 'styled-components';
import placeholder from 'src/assets/images/placeholders/ph2.jpg';

const Container = styled.div`
  flex-grow: 4;
`;

const Details = () => (
  <Container>
    <div class="detail_content">
                    <div class="video">
                        <img src={placeholder} />
                    </div>
                    <div class="img_txt">
                        <p class="img">
                            <img src={placeholder} />
                        </p>
                        <p class="txt">
                            I love it !, just a comment, in the photo the necklace had 3 colors, black, gold and white,
                            however the necklace I received was only black with gold. Anyway, it's beautiful!
                        </p>
                        <p class="img">
                            <img src={placeholder} />
                        </p>
                        <p class="img">
                            <img src={placeholder} />
                        </p>
                    </div>
                </div>
  </Container>
);

export default Details;
