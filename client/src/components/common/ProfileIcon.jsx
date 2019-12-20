import React from 'react';
import styled from 'styled-components';
import { ReactComponent as User } from 'src/assets/svgs/user.svg';
import { Link } from 'react-router-dom';

const Container = styled(Link)`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  
`;

const ProfileIcon = () => (
  <Container to="/profile">
    <User />
  </Container>
);

export default ProfileIcon;
