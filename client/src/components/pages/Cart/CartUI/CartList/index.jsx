import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Toolbar from './Toolbar';
import List from './List';
import theme from 'src/theme';

const Container = styled.div`
  width: 100%;
  @media (min-width: ${theme.desktopContentWidth}px) {
    padding: 0 2rem; 
  }
`;

const CartList = ({ cart }) => {
  const [selectedItemId, setSelectedItemId] = useState([]);
  useEffect(() => {
    const selectedInit = cart.map((cartObj) => cartObj._id)
    setSelectedItemId(selectedInit);
  }, [])
  
  return (
    <Container>
      <Toolbar  
        cart={cart}
        selectedItemId={selectedItemId}
        setSelectedItemId={setSelectedItemId}
      />
      <List 
        cart={cart} 
        selectedItemId={selectedItemId}
        setSelectedItemId={setSelectedItemId}
      />
    </Container>
  )
};

export default CartList;