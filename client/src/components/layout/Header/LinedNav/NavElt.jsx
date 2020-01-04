import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import theme from 'src/theme';

const NavElt = (props) => {
  const { pathname } = useLocation();
  const isSelected = pathname === props.path;
  const color = isSelected ? theme.green : 'black';
  const borderWidth = isSelected ? 3 : 0;
  const opacity = isSelected ? 1 : '.6';
  const Container = styled(Link)`
    padding: 0 1rem .8rem 1rem;
    border-bottom: ${borderWidth}px solid ${color};
    font-size: 1rem;
    font-weight: bold;
    color: ${color};
    opacity: ${opacity};
    overflow: visible;
    display: ${props.hide ? 'none' : 'inline'};
  `;

  return (
    <Container to={props.path}>
      {props.name}
    </Container>
  );
};

export default NavElt;
