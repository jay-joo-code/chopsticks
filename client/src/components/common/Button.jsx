import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import { Link } from 'react-router-dom';

const Button = (props) => {
  const {
    inverted, children, link, to,
  } = props;
  const StyledButton = styled.button`
    width: 100%;
    background-color: ${inverted ? theme.green : 'white'};
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
    color: ${inverted ? 'white' : theme.green};
    padding: .5rem 1.5rem;
    margin: 1rem 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  if (link) {
    return (
      <Link to={to}>
        <StyledButton>
          {children}
        </StyledButton>
      </Link>
    );
  }

  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
