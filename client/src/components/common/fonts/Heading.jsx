import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h2`
  color: ${(props) => props.theme.green};
  font-size: 1.4rem;
  font-weight: bold;
`;

const Heading = ({ children, ...rest }) => (
  <StyledHeading {...rest}>
    {children}
  </StyledHeading>
);

export default Heading;
