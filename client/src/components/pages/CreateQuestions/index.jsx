import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'src/components/common/Button';
import { Link } from 'react-router-dom';
import ButtonList from './ButtonList';
import QuestionForm from './QuestionForm';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin: 2rem 0;
`;

const CreateQuestions = () => {
  const [selected, setSelected] = useState(0);
  const selectedState = [selected, setSelected];
  return (
    <Container>
      <ButtonList selectedState={selectedState} />
      <QuestionForm selectedState={selectedState} />
      <StyledLink to="/create">
        <Button>Next</Button>
      </StyledLink>
    </Container>
  );
};

export default CreateQuestions;
