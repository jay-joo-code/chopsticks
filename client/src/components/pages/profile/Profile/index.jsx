import React, { useEffect } from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import logout from 'src/util/auth/logout';
import { useHistory } from 'react-router-dom';
import Form from './Form';
import TitledPage from 'src/components/layout/TitledPage';
import { useSelector } from 'react-redux';
import PwdForm from './PwdForm';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import Heading from 'src/components/common/fonts/Heading';

const Center = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`

const Container = styled.div`
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    max-width: 600px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`

const Profile = () => {
  const history = useHistory();
  const handleLogout = () => {
    logout();
    history.push('/');
  };
  
  const user = useSelector((state) => state.user);
  
  useEffect(() => {
    if (user && user._id) fetchSelfAndStore(user._id);
  }, [])
  
  if (!user) return <div />;
  
  return (
    <Center>
      <Container>
        <Heading>회원정보</Heading>
        <Form
          user={user}
        />
        <Heading>비밀번호 재설정</Heading>
        <PwdForm
          user={user}
        />
        <BtnContainer>
          <Btn 
            color='primary'
            onClick={handleLogout}
          >로그아웃</Btn>
        </BtnContainer>
      </Container>
    </Center>
  );
};

export default Profile;
