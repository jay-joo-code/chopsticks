import React from 'react';
import Label from 'src/components/common/fonts/Label';
import styled from 'styled-components';
import Muted from 'src/components/common/fonts/Muted';
import AddOptGrpBtn from './AddOptGrpBtn';
import OptGrpList from './OptGrpList';

const Container = styled.div`
  
`

const Opts = ({ formik }) => {
  
  
  return (
    <Container>
      <Label>옵션 <Muted>Optional</Muted></Label>
      <AddOptGrpBtn formik={formik} />
      <OptGrpList formik={formik} />
    </Container>
  )
};

export default Opts;
