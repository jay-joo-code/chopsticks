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
      <Label>필수 옵션 <Muted>Optional</Muted></Label>
      <Body muted mb={1}>*필수로 설정해야 하는 기본 옵션을 설정합니다.</Body>
      <AddOptGrpBtn formik={formik} optional={false} />
      <OptGrpList formik={formik} optional={false} />
      <Label>선택 옵션 <Muted>Optional</Muted></Label>
      <Body muted mb={1}>*추가로 선택 옵션을 추가할 수 있습니다.</Body>
      <AddOptGrpBtn formik={formik} optional={true} />
      <OptGrpList formik={formik} optional={true} />
      <OptDataInput formik={formik} />
    </Container>
  )
};

export default Opts;
