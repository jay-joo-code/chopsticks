import React from 'react';
import styled from 'styled-components';
import OptList from './OptList';
import InputRow from './InputRow';

const Container = styled.div`
  margin: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`;

const OptGrp = ({ formik, optGrp, index }) => {
  return (
    <Container>
      <InputRow formik={formik} index={index} optGrp={optGrp} />
      <OptList optGrp={optGrp} formik={formik} grpIndex={index} />
    </Container>
  )
};

export default OptGrp;
