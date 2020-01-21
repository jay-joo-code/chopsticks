import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h2`
  color: ${(props) => props.theme.green};
  font-size: 2rem;
`;

const Title = (props) => (
  <StyledTitle>
    {props.children}
  </StyledTitle>
);

export default Title;
