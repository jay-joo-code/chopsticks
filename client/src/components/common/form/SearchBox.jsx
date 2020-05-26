import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import { ReactComponent as Icon } from 'src/assets/svgs/magnifier.svg';
import useRouter from 'src/util/hooks/useRouter';

const Container = styled.div`
  
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 2;
  right: 1rem;
  height: 1.2rem;
  cursor: pointer;
`;

const SearchBox = ({ autoFocus, onSubmit }) => {
  const { query, updatePathAndQuery } = useRouter();
  const [value, setValue] = useState(query.search);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePathAndQuery('/browse', { search: value })
    if (onSubmit) onSubmit();
  };

  useEffect(() => {
    setValue(query.search || '');
  }, [query.search])
  
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <OutlinedInput
          type="text"
          placeholder="검색"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          width={300}
          autoFocus={autoFocus}
        />
        <StyledIcon onClick={handleSubmit}/>
      </Form>
    </Container>
  );
};

export default SearchBox;
