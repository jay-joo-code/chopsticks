import React from 'react';
import styled from 'styled-components';
import OptList from './OptList';
import InputRow from './InputRow';

const Container = styled.div`
  margin: 1rem 0;
`;

const OptGrp = ({ formik, optGrp, index }) => {
  return (
    <Container>
      <InputRow formik={formik} index={index} optGrp={optGrp} />
      <OptList opts={optGrp.opts} formik={formik} grpIndex={index} />
    </Container>
  )
};

export default OptGrp;
