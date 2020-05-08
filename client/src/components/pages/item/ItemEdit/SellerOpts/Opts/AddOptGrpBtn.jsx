import React from 'react';
import styled from 'styled-components';
import Badge from 'src/components/common/displays/Badge';

const Container = styled.div`

`;

const AddOptGrpBtn = ({ formik }) => {
  const handleClick = () => {
    const newOptGrps = [...formik.values.optGrps];
    const initData = {
      title: '',
      opts: [],
    };
    newOptGrps.push(initData);
    formik.setFieldValue('optGrps', newOptGrps);
  }
  
  return (
    <Container>
      <Badge
        color='primary'
        inverted
        type='button'
        size='sm'
        onClick={handleClick}
      >
        옵션 추가 +
      </Badge>
    </Container>
  )
};

export default AddOptGrpBtn;
