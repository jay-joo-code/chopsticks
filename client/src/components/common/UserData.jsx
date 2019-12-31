import React from 'react';
import styled from 'styled-components';
import ProfileIcon from 'src/components/common/ProfileIcon';

const Container = styled.div`
  display: flex;
`;

const Data = styled.div`
  opacity: .8;
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const Name = styled.div`

`;

const Email = styled.div`

`;

const UserData = (props) => {
  const { user } = props;
  if (!user) return <div />;

  return (
    <Container>
      <ProfileIcon {...props} />
      <Data>
        <Name>{user.name}</Name>
        <Email>{user.email}</Email>
      </Data>
    </Container>
  );
};

export default UserData;
