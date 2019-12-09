import React from 'react';
import styled from 'styled-components';
import Icon from 'src/components/common/Icon';
import { useSelector, useDispatch } from 'react-redux';
import log from 'src/util/log';

const Container = styled.div`
  display: flex;
  padding: 1rem;
`;

const IconContainer = styled.div`
  margin: 0 .5rem;
`;

const ButtonList = (props) => {
  const [selected, setSelected] = props.selectedState;
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.poll.questions);

  const handleCreateQuestion = () => {
    // max 10 questions
    if (questions.length >= 10) return;

    const newQuestion = {
      question: '',
      options: ['', '', '', ''],
    };
    const update = [...questions];
    update.push(newQuestion);
    dispatch({
      type: 'SET_QUESTIONS',
      payload: update,
    });
  };

  return (
    <Container>
      {questions.map((elt, i) => (
        <IconContainer key={i}>
          <Icon inverted={i === selected} onClick={(e) => setSelected(i)}>{i + 1}</Icon>
        </IconContainer>
      ))}
      <IconContainer>
        <Icon onClick={handleCreateQuestion}>+</Icon>
      </IconContainer>
    </Container>
  );
};

export default ButtonList;
