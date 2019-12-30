import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem 0;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    padding: 4rem 0 2rem 0;
  }
`;

const ItemPage = (props) => {
  // TODO: CONDITIONALLY ADD OPTIONS FOR OWNER
  return (
    <Container {...props}>
        {props.children}
    </Container>
  )
};

export default ItemPage;
