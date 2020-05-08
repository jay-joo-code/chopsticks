import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  padding: .5rem 0;
  margin: .5rem;
`;

const TextCont = styled.div`
  margin: 0 1rem;
`;

const RightCont = styled.div`
  display: flex;
`;

const Delete = styled.div`
  padding: 0 .5rem;
  cursor: pointer;
`;

const Option = ({
  opt, index, formik, grpIndex, optional
}) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    if (optional && index === 0 && opt === '선택안함') {
      dispatch({
        type: 'ALERT_SET',
        payload: {
          show: true,
          color: 'danger',
          msg: '선택 옵션의 선택안함 옵션은 필수 입니다'
        }
      })
    }
    else {
      const newOptGrps = [...formik.values.optGrps];
      newOptGrps[grpIndex].opts.splice(index, 1);
      formik.setFieldValue('optGrps', newOptGrps);
    }
  };
  
  return (
    <Container>
      <TextCont>
        {opt}
      </TextCont>
      <RightCont>
        <Delete onClick={handleDelete}>X</Delete>
      </RightCont>
    </Container>
  );
};

export default Option;
