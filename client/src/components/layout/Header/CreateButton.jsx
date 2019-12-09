import React from 'react';
import styled from 'styled-components';
import Button from 'src/components/common/Button';
import { Link, useLocation } from 'react-router-dom';

const StyledLink = styled(Link)`
  
`;

const CreateButton = () => {
  const { pathname } = useLocation();
  const rootPath = pathname.split('/')[1];

  if (rootPath === 'create') return <div />;

  return (
    <StyledLink to="/create/questions">
      <Button>Create</Button>
    </StyledLink>
  );
};

export default CreateButton;
