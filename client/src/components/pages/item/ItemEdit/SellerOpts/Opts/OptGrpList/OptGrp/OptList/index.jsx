import React from 'react';
import styled from 'styled-components';
import OptionElt from './OptionElt';

const Container = styled.div`

`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const OptionsList = ({ optGrp, formik, grpIndex }) => {
  const { opts, optional } = optGrp;

  return (
    <Container>
      <List>
        {opts && opts.map((opt, i) => (
          <OptionElt
            key={opt.name}
            index={i}
            opt={opt}
            formik={formik}
            grpIndex={grpIndex}
            optional={optional}
          />
        ))}
      </List>
    </Container>
  );
};

export default OptionsList;
