import React, { useState } from 'react';
import styled from 'styled-components';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import { ReactComponent as Icon } from 'src/assets/svgs/magnifier.svg';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  right: 1rem;
  top: 1.5rem;
  height: 1rem;
  width: 1rem;
`;

const SearchBox = ({ autoFocus, onSubmit }) => {
  const [query, setQuery] = useState('');
  
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/browse?search=${query}`);
    onSubmit();
  };
  
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <OutlinedInput
          type="text"
          placeholder="검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          width={300}
          autoFocus={autoFocus}
        />
        <button type="submit"><StyledIcon /></button>
      </Form>
    </Container>
  );
};

export default SearchBox;
