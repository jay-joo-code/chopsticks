import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';

const Icon = (props) => {
  const { inverted } = props;
  const bg = inverted ? theme.blue : 'white';
  const color = inverted ? 'white' : theme.blue;
  const opacity = inverted ? '.8' : '1';

  const Container = styled.div`
    background-color: ${bg}
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
    color: ${color};
    padding: .5rem;
    cursor: pointer;
    opacity: ${opacity};
  `;

  return (
    <Container {...props}>
      {props.children}
    </Container>
  );
};

export default Icon;
