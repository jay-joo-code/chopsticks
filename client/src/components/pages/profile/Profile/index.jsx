import React from 'react';
import styled from 'styled-components';
import Button from 'src/components/common/Button';
import logout from 'src/util/auth/logout';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem 0;
`;

const Profile = () => {
  const history = useHistory();
  const handleLogout = () => {
    logout();
    history.push('/');
  };
  return (
    <Container>
      <Button onClick={handleLogout}>로그아웃</Button>
    </Container>
  );
};

export default Profile;
