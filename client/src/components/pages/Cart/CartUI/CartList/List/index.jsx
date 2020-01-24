import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListElt from './ListElt';
import log from 'src/util/log';

const Container = styled.div`

`;

const List = ({ cart, selectedItemId, setSelectedItemId }) => {
  return (
    <Container>
      {cart.map((cartObj) => (
        <ListElt 
          key={cartObj._id} 
          cartObj={cartObj} 
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
        />
      ))}
    </Container>
  )
};

export default List;
