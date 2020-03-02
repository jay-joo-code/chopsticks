import React from 'react';
import styled from 'styled-components';

const StyledBody = styled.span`
  font-size: .7rem;
  opacity: .8;
`;

const Body = ({ children, ...rest}) => (
  <StyledBody {...rest}>
    {children}
  </StyledBody>
);

export default Body;
