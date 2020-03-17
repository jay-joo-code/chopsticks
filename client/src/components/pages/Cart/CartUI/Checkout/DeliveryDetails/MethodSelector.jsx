import React from 'react';
import styled from 'styled-components';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`
  margin-top: 1rem;
`;

const Input = styled.input`
  margin: 0 .5rem 0 0 !important;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: .5rem;
`

const MethodSelector = ({ method, setMethod }) => {
  const handleChange = (e) => {
    setMethod(e.target.value);  
  }
  
  return (
    <Container>
      <Row>
        <Input
          type='radio'
          value='card'
          checked={method === 'card'}
          onChange={handleChange}
        />
        <Body>카드</Body>
      </Row>
      <Row>
        <Input
          type='radio'
          value='vbank'
          checked={method === 'vbank'}
          onChange={handleChange}
        />
        <Body>가상계좌</Body>
      </Row>
    </Container>
  )
};

export default MethodSelector;
