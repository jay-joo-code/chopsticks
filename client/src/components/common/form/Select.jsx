import React from 'react';
import styled from 'styled-components';
import selectIcon from 'src/assets/images/ui/select.png';

const Container = styled.select `
  color: #7a8680;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(${selectIcon}) no-repeat 93% 50%;
  border-radius: 8px;
  background-color: #ffffff;
  padding: .6rem 3rem .6rem 1rem;
`;

const Select = (props) => {
  return (
    <Container {...props}>
      {props.children}
    </Container>
  )
};

export default Select;
