import React from 'react';
import styled from 'styled-components';
import OutlinedInput from 'src/components/common/form/OutlinedInput'; 

const Container = styled.div`
  display: flex;
`;

const Option = ({ option }) => {
  return (
    <Container>
      <OutlinedInput
        value={option.name}
        disabled='disabled'
      />
      <OutlinedInput
        value={option.priceChange}
        disabled='disabled'
      />
    </Container>
  )
};

export default Option;
