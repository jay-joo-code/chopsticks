import React from 'react';
import styled from 'styled-components';

const StyledBody = styled.p`
  opacity: .8;
  font-size: 1rem;
  
  font-size: ${props => props.muted ? '.8rem' : ''};
`;

const Body = ({ children, muted, ...rest }) => (
  <StyledBody 
    {...rest}
    muted={muted}  
  >
    {children}
  </StyledBody>
);

export default Body;
