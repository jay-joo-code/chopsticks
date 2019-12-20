import React from 'react';
import styled from 'styled-components';
import Button from 'src/components/common/Button';
import { useSelector } from 'react-redux';
import ProfileIcon from 'src/components/common/ProfileIcon';

const Container = styled.div`

`;

const UserSection = () => {
  const user = useSelector((state) => state.user);
  return (
    <Container>
      {(user)
        ? <ProfileIcon />
        : <Button to="/login" link inverted>로그인</Button>}
    </Container>
  );
};

export default UserSection;
