import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import { ReactComponent as Icon } from 'src/assets/svgs/magnifier.svg';
import log from 'src/util/log';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  margin-left: 2rem;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`

const StyledIcon = styled(Icon)`
  position: absolute;
  right: 1rem;
  top: 1.5rem;
  height: 1rem;
  width: 1rem;
`

const SearchBox = () => {
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target[0].value;
    history.push(`/browse?search=${query}`)
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <OutlinedInput 
          type="text"
          placeholder="검색" 
        />
        <button type='submit'><StyledIcon /></button>
      </Form>
    </Container>
  )
};

export default SearchBox;
