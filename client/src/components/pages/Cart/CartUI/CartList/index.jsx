import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Toolbar from './Toolbar';
import List from './List';

const Container = styled.div`
  width: 100%;
  padding: 0 2rem;
`;

const CartList = ({ cart }) => {
  const [selectedIndex, setSelectedIndex] = useState(Array(cart.length).fill(1));
  
  return (
    <Container>
      <Toolbar  
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <List 
        cart={cart} 
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </Container>
  )
};

export default CartList;