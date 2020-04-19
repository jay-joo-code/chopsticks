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

const OptionsList = ({ opts, formik, grpIndex }) => {
  

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
          />
        ))}
      </List>
    </Container>
  );
};

export default OptionsList;
