import React from 'react';
import styled from 'styled-components';
import RedButton from 'src/components/common/buttons/RedButton';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  width: 100%;
`;

const CheckboxCont = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.label`
  margin-left: .5rem;
  opacity: .8;
`

const Toolbar = ({ selectedIndex, setSelectedIndex }) => {
  
  return (
    <Container>
    <CheckboxCont>
      <input type='checkbox' />
      <Label>전체선택</Label>
    </CheckboxCont>
    <RedButton>선택삭제</RedButton>
    </Container>
  )
};

export default Toolbar;
