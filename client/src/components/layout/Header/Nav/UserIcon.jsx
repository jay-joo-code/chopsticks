import React from 'react';
import styled from 'styled-components';
import { ReactComponent as User } from 'src/assets/svgs/user2.svg';

const Container = styled.div`
  height: 1.7rem;
  width: 1.7rem;
  opacity: .8;
  margin: .5rem;
  margin-bottom: .7rem;
`;

const UserIcon = () => {
  
  return (
    <Container>
      <User />
    </Container>
  )
};

export default UserIcon;
