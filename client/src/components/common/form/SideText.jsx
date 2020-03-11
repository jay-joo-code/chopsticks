import React from 'react';
import styled from 'styled-components';

const Container = styled.p`
  margin-left: .5rem;
  white-space: nowrap;
`;

const SideText = ({ children, ...rest }) => (
  <Container {...rest}>
    {children}
  </Container>
);

export default SideText;
