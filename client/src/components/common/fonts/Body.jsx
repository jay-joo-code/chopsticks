import React from 'react';
import styled from 'styled-components';

const StyledBody = styled.p`
  opacity: .8;
  font-size: 1rem;
  line-height: 1.2;
  white-space: pre-line;
  
  font-size: ${props => props.muted ? '.8rem' : ''};
  margin-bottom: ${props => props.mb ? `${props.mb}rem`: ''};
`;

const Body = ({ children, muted, mb, ...rest }) => (
  <StyledBody 
    {...rest}
    mb={mb}
    muted={muted}  
  >
    {children}
  </StyledBody>
);

export default Body;
