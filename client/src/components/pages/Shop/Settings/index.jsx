import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Settings from './Settings';

const Container = styled.div`
`;

const SettingsIndex = () => {
  const user = useSelector((state) => state.user);
  if (!user || !user.shop) return <div />;

  return (
    <Container>
      <Settings
        user={user}
      />
    </Container>
  );
};

export default SettingsIndex;
