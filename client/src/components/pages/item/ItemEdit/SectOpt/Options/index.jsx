import React from 'react';
import styled from 'styled-components';
import OptionsAdd from './OptionsAdd';
import OptionsList from './OptionsList';

const Container = styled.div`
  
`;

const SectTwo = ({ formik, name }) => (
  <Container>
    <OptionsAdd
      formik={formik}
      name={name}
    />
    <OptionsList
      formik={formik}
      name={name}
    />
  </Container>
);

export default SectTwo;
