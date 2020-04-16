import React from 'react';
import styled from 'styled-components';

const StyledBody = styled.p`
  opacity: .8;
  font-size: 1rem;
  line-height: 1.2;
  white-space: pre-line;
  word-break: break-word;
  overflow: hidden;
  
  font-size: ${props => props.muted ? '.8rem' : ''};
  margin-bottom: ${props => props.mb ? `${props.mb}rem`: ''};
  color: ${props => props.color ? props.theme[props.color] : ''};
`;

const Body = ({ children, muted, mb, color, ...rest }) => (
  <StyledBody 
    {...rest}
    mb={mb}
    muted={muted}  
    color={color}
  >
    {children}
  </StyledBody>
);

export default Body;
