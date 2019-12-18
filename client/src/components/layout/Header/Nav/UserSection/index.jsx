import React from 'react';
import styled from 'styled-components';
import Button from 'src/components/common/Button';
import { useSelector } from 'react-redux';
import logout from 'src/util/logout';

const Container = styled.div`

`;

const UserSection = () => {
  const user = useSelector((state) => state.user);
  return (
    <Container>
      {(user)
        ? <Button onClick={logout} inverted>로그아웃</Button>
        : <Button to="/login" link inverted>로그인</Button>}
    </Container>
  );
};

export default UserSection;
