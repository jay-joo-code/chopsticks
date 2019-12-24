import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  opacity: .7;
  font-size: .9rem;
`;

const StyledDate = styled.p`
  
`

const Metadata = ({ date }) => {
  const formattedDate = date ? date.split('T')[0] : '';
  return (
    <Container>
      <StyledDate>{formattedDate}</StyledDate>
    </Container>
  )
};

export default Metadata;
