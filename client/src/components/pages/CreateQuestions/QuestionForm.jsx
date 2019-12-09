import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'src/components/common/Input';
import log from 'src/util/log';

const indexToChar = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
};

const Container = styled.div`
  background-color: white;
  max-width: 100%:
  overflow: hidden;
  padding: 3rem 1rem;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  opacity: .8;
  
  display: flex;
  flex-direction: column;
`;

const QuestionContainer = styled.div`
  font-size: 2rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  font-size: 1.5rem;
`;

const Option = styled.span`
  padding: .5rem 0;
`;

const DeleteContainer = styled.div`
  display: flex
  justify-content: center;
  padding: 1rem 0 0 0;
`;

const DeleteButton = styled.div`
  color: ${(props) => props.theme.red};
  text-decoration: underline;
  cursor: pointer;
`;

const QuestionForm = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = props.selectedState;
  const question = useSelector((state) => state.poll.questions[selected]);
  const handleQuestionChange = (e) => {
    const newQuestion = { ...question };
    newQuestion.question = e.target.value;
    dispatch({
      type: 'UPDATE_QUESTION',
      payload: {
        selected,
        data: newQuestion,
      },
    });
  };
  const handleOptionChange = (e, i) => {
    const newQuestion = { ...question };
    newQuestion.options.splice(i, 1, e.target.value);
    dispatch({
      type: 'UPDATE_QUESTION',
      payload: {
        selected,
        data: newQuestion,
      },
    });
  };
  const handleDelete = () => {
    if (!selected) return;

    // update selected to an existing question
    setSelected(selected - 1);

    dispatch({
      type: 'DELETE_QUESTION',
      paylod: selected,
    });
  };

  log('component question', question);

  return (
    <Container>
      <QuestionContainer>
        <span>
          {selected + 1}
.
          {' '}
        </span>
        <Input value={question.question} onChange={handleQuestionChange} />
      </QuestionContainer>
      <OptionsContainer>
        {question.options.map((elt, i) => (
          <Option key={i}>
            {indexToChar[i]}
.
            {' '}
            <Input value={question.options[i]} onChange={(e) => handleOptionChange(e, i)} />
          </Option>
        ))}
      </OptionsContainer>
      <DeleteContainer>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </DeleteContainer>
    </Container>
  );
};

export default QuestionForm;
