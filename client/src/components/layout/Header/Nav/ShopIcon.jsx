import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ShopSVG } from 'src/assets/svgs/shop2.svg';

const Container = styled.div`
  margin: .5rem;
  width: 2rem;
  height: 2rem;
  opacity: .8;
`;

const ShopIcon = () => {
  return (
      <Container>
        <ShopSVG />
      </Container>
  );
};

export default ShopIcon;
