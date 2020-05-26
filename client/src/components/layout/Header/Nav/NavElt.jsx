import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Notification from 'src/components/common/Notification';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  margin: 0 .5rem;
  position: relative;
  
  // mobile
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    display: ${props => props.mobile ? 'none' : ''};
  }
`;

const Label = styled.p`
  font-size: .7rem;
  opacity: .8;
  text-align: center;
  text-decoration: none;
  margin-top: .5rem;
`

const NavElt = ({ icon, label, notification, to, top, right, mobile }) => {
  return (
    <Link to={to}>
      <Container mobile={mobile}>
        {icon}
        <Label>{label}</Label>
        {notification && notification !== '0' && (<Notification text={notification} top={top} right={right} />)}
      </Container>
    </Link>
  )
};

export default NavElt;
