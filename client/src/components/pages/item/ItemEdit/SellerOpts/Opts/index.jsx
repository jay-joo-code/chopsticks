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
      <AddOptGrpBtn formik={formik} optional={false} />
      <OptGrpList formik={formik} optional={false} />
      <OptDataInput formik={formik} />
    </Container>
  )
};

/*
<Label>선택 옵션 <Muted>Optional</Muted></Label>
<Body muted mb={1}>*추가로 선택 옵션을 추가할 수 있습니다.</Body>
<AddOptGrpBtn formik={formik} optional={true} />
<OptGrpList formik={formik} optional={true} />
*/

export default Opts;
