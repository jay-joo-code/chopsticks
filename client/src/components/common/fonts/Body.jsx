import React from 'react';
import styled from 'styled-components';

const StyledBody = styled.p`
  opacity: .8;
  font-size: 1rem;
  line-height: 1.2;
  white-space: pre-line;
  
  font-size: ${props => props.muted ? '.8rem' : ''};
  margin-bottom: ${props => props.mb ? `${props.mb}rem`: ''};
  
  // strong
  //opacity: ${props => props.strong ? '.9' : ''};
  //font-weight: ${props => props.strong ? 'bold' : ''};
`;

const Body = ({ children, muted, mb, strong, ...rest }) => (
  <StyledBody 
    {...rest}
    mb={mb}
    muted={muted}  
    strong={strong}
  >
    {children}
  </StyledBody>
);

export default Body;
