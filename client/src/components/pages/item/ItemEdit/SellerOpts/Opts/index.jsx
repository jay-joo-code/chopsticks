import React from 'react';
import Label from 'src/components/common/fonts/Label';
import Body from 'src/components/common/fonts/Body';
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
      <Body muted mb={1}>*크기, 색상 등 옵션이 있다면 옵션을 추가해 보세요.</Body>
      <AddOptGrpBtn formik={formik} />
      <OptGrpList formik={formik} />
    </Container>
  )
};

export default Opts;
