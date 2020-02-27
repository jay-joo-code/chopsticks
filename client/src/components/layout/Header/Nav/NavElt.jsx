import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Notification from 'src/components/common/Notification';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  margin: 0 .3rem;
  position: relative;
`;

const Icon = styled.div`
  height: 1.5rem !important;
  width: 1.5rem !important;
`

const Label = styled.p`
  font-size: .7rem;
  opacity: .8;
  text-align: center;
  text-decoration: none;
  margin-top: .5rem;
`

const NavElt = ({ icon, label, notification, to, top, right }) => {
  return (
    <Link to={to}>
      <Container>
        <Icon>
          {icon}
        </Icon>
        <Label>{label}</Label>
        {notification && (<Notification text={notification} top={top} right={right} />)}
      </Container>
    </Link>
  )
};

export default NavElt;
