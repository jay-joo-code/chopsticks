import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: .5rem .8rem;
  background-color: white;
  color: ${(props) => props.theme.green};
  display: inline-block;
  font-size: inherit;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
`;

const Badge = (props) => (
  <Container {...props}>
    {props.children}
  </Container>
);

export default Badge;
