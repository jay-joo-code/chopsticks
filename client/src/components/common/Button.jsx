import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';

const Button = (props) => {
  const { inverted, children } = props;
  const StyledButton = styled.button`
    width: 100%;
    background-color: white;
  `;

  const Container = styled.div`
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

  return (
    <StyledButton {...props}>
      <Container>
        {children}
      </Container>
    </StyledButton>
  );
};

export default Button;
