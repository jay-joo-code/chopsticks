import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';

const Button = (props) => {
  const { inverted } = props;
  const Container = styled.div`
    background-color: ${inverted ? theme.blue : 'white'};
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
    color: ${inverted ? 'white' : theme.blue};
    padding: .5rem 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  `;
  return (
    <Container {...props}>
      {props.children}
    </Container>
  );
};

export default Button;
