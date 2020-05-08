import React from 'react';
import styled from 'styled-components';
import OptGrp from './OptGrp';

const Container = styled.div`
  
`;

const OptGrpList = ({ formik }) => {

  return (
    <Container>
      {formik.values.optGrps.map((optGrp, index) => {
        return (
          <OptGrp
            key={index}
            formik={formik}
            optGrp={optGrp}
            index={index}
          />
        )
      })}
    </Container>
  )
};

export default OptGrpList;
