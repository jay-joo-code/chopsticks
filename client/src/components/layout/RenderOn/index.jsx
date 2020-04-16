import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: none;
  display: ${props => props.mobile ? 'block' : ''};
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    display: none;
    display: ${props => props.desktop ? 'block' : ''};
  }
`;

const RenderOn = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      {children}
    </Container>
  )
};

export default RenderOn;
