import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h2`
  color: ${(props) => props.theme.green};
  font-size: 1.4rem;
  font-weight: bold;
`;

const Title = (props) => (
  <StyledTitle>
    {props.children}
  </StyledTitle>
);

export default Title;
