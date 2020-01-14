import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  padding: .5rem 0;
  margin: .5rem;
`;

const TextCont = styled.div`
  margin: 0 1rem;
`;

const RightCont = styled.div`
  display: flex;
`;

const Delete = styled.div`
  padding: 0 .5rem;
  cursor: pointer;
`;

const Option = ({
  option, index, formik, name,
}) => {
  const handleDelete = () => {
    const newOptions = formik.values[name];
    newOptions.splice(index, 1);
    formik.setFieldValue(name, newOptions);
  };
  return (
    <Container>
      <TextCont>
        {option.name}
      </TextCont>
      <RightCont>
        <TextCont>
    +
          {option.priceChange}
        </TextCont>
        <Delete onClick={handleDelete}>X</Delete>
      </RightCont>
    </Container>
  );
};

export default Option;
