import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h2`
  color: ${(props) => props.theme.blue};
  font-size: 4rem;
`;

const Title = (props) => (
  <StyledTitle>
    {props.children}
  </StyledTitle>
);

export default Title;
