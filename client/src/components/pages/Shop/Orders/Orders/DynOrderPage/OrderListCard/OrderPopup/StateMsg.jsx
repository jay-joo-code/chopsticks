import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const StateMsg = ({ order }) => {
  
  if (!order) return <div />;
  
  return (
    <Container>
        StateMsg
    </Container>
  )
};

export default StateMsg;
