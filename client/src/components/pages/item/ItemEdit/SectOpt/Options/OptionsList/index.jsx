import React from 'react';
import styled from 'styled-components';
import OptionElt from './OptionElt';

const Container = styled.div`

`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
`;

const OptionsList = ({ formik, name }) => {
  const elts = formik.values[name];

  return (
    <Container>
      <List>
        {elts && elts.map((option, i) => (
          <OptionElt
            key={option.name}
            index={i}
            option={option}
            formik={formik}
            name={name}
          />
        ))}
      </List>
    </Container>
  );
};

export default OptionsList;
