import React from 'react';
import Label from 'src/components/common/fonts/Label';
import Body from 'src/components/common/fonts/Body';
import styled from 'styled-components';
import Muted from 'src/components/common/fonts/Muted';
import AddOptGrpBtn from './AddOptGrpBtn';
import OptGrpList from './OptGrpList';
import OptDataInput from './OptDataInput';

const Container = styled.div`
  & > label {
    margin-top: 2rem;
  }
`

const Opts = ({ formik }) => {

  return (
    <Container>
      <Label>옵션 <Muted>Optional</Muted></Label>
      <AddOptGrpBtn formik={formik} />
      <OptGrpList formik={formik} />
      <OptDataInput formik={formik} />
    </Container>
  )
};

export default Opts;
