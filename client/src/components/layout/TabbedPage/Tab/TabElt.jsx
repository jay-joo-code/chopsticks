import React from 'react';
import styled from 'styled-components';
import theme from 'src/theme';

const Container = styled.div`
  padding: 1rem 2rem;
  font-size: 1rem;
  text-align: center;
  background: ${(props) => (props.on ? '#e8faf1' : '#fff')};
  color: ${(props) => (props.on ? '#000' : '#7a8680')};
  box-shadow: ${(props) => (props.on ? '0 8px 8px 0 rgba(78, 194, 136, 0.2)' : 'none')};
  cursor: pointer;
  
  @media (min-wdith: ${theme.desktopContentWidth}px) {
    padding: 1rem 3rem;
  }
`;

const Tab = (props) => {
  const { page } = props;
  return (
    <Container {...props}>
      {page.name}
    </Container>
  );
};

export default Tab;
