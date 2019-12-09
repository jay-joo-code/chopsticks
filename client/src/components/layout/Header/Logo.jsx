import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled(Link)`
    font-size: 1.5rem;
    color: ${(props) => props.theme.blue};
    font-weight: bold;
`;

const Logo = () => (
  <Container to="/">
    Pollon
  </Container>
);

export default Logo;
