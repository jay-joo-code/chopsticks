import React from 'react';
import styled from 'styled-components';

const Container = styled.p`
  margin-left: 1rem;
`;

const SideText = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      {children}
    </Container>
  )
};

export default SideText;
