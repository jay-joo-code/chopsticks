import React from 'react';
import styled from 'styled-components';
import OptGrp from './OptGrp';

const Container = styled.div`
  
`;

const OptGrpList = ({ formik, optional }) => {
  
  return (
    <Container>
      {formik.values.optGrps.map((optGrp, index) => {
        if (optGrp.optional === optional) {
          return (
            <OptGrp 
              key={index} 
              formik={formik} 
              optGrp={optGrp} 
              index={index}
            /> 
          )
        }
        else {
          return <div />;
        }
        })}
    </Container>
  )
};

export default OptGrpList;
