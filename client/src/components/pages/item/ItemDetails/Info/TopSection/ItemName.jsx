import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: ${props => props.theme.green};
  font-size: 2rem;
`;

const ItemName = (props) => {
  return (
    <Container>
      {props.name} 
    </Container>
  )
};

export default ItemName;
