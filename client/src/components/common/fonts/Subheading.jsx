import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  opacity: .9;
`;

const Heading = ({ children, ...rest }) => (
  <StyledHeading {...rest}>
    {children}
  </StyledHeading>
);

export default Heading;
