import React from 'react';
import styled from 'styled-components';
import Button from 'src/components/common/Button';
import { ReactComponent as Cart } from 'src/assets/svgs/cart.svg';

const Container = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  margin: 0 1rem 0 0;
`

const Purchase = () => {
  return (
    <Container>
      <ButtonContainer>
        <Button><Cart /></Button>
      </ButtonContainer>
      <Button inverted>구매</Button>
    </Container>
  )
};

export default Purchase;
