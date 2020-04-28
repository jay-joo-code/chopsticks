import React from 'react';
import styled from 'styled-components';
import Badge from 'src/components/common/displays/Badge';

const Container = styled.div`

`;

const AddOptGrpBtn = ({ formik, optional }) => {
  const handleClick = () => {
    const newOptGrps = [...formik.values.optGrps];
    const opts = optional ? ['선택안함'] : [];
    const initData = {
      title: '',
      opts,
      optional,
    }
    if (optional) {
      newOptGrps.push(initData);
    }
    else {
      newOptGrps.unshift(initData);
    }
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
