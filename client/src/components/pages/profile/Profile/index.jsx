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

const Container = styled.div`
  display: flex;
  justify-content: center;
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
    <Container>
      <TitledPage title='회원정보'>
        <Form
          user={user}
        />
        <PwdForm
          user={user}
        />
        <BtnContainer>
          <Btn 
            color='primary'
            onClick={handleLogout}
          >로그아웃</Btn>
        </BtnContainer>
      </TitledPage>
    </Container>
  );
};

export default Profile;
