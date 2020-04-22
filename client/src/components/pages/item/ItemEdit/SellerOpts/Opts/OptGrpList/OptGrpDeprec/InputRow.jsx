import React, { useState } from 'react';
import styled from 'styled-components';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import RoundBtn from 'src/components/common/buttons/RoundBtn';

const Container = styled.div`

`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: .5rem 0;
`;

const Input = styled(OutlinedInput)`
  margin-right: .5rem;
  
`

const InputRow = ({ formik, index, optGrp }) => {
  const handleTitleChange = (e) => {
    let newOptGrps = [...formik.values.optGrps];
    newOptGrps[index].title = e.target.value;
    formik.setFieldValue('optGrps', newOptGrps);
  }
  
  const [name, setName] = useState('');
  const [diff, setDiff] = useState(0);
  
  const handleChange = (e, type) => {
    if (type === 'name') {
      setName(e.target.value);
    } else if (type === 'diff') {
      console.log(!isNaN(e.target.value))
      if (!isNaN(e.target.value)) setDiff(e.target.value);
    }
  }
  
  const handleAddOpt = () => {
    let newOptGrps = [...formik.values.optGrps];
    newOptGrps[index].opts.push({ name, diff })
    formik.setFieldValue('optGrps', newOptGrps);
    setName('');
    setDiff(0);
  }
  
  const handleDeleteOtpGrp = () => {
    let newOptGrps = [...formik.values.optGrps];
    newOptGrps.splice(index, 1);
    formik.setFieldValue('optGrps', newOptGrps);
  }
  
  return (
    <Container>
    <Row>
      <Input
        value={optGrp.title}
        onChange={handleTitleChange}
        placeholder='옵션 종류 ex) 색상'
        width={300}
      />
      <RoundBtn onClick={handleDeleteOtpGrp}>x</RoundBtn>
    </Row>
    <Row>
      <Input
        value={name}
        onChange={(e) => handleChange(e, 'name')}
        placeholder='옵션 이름'
        width={200}
      />
      <Input
        value={diff}
        onChange={(e) => handleChange(e, 'diff')}
        placeholder='추가 금액'
        width={200}
      />
      <RoundBtn onClick={handleAddOpt}>+</RoundBtn>
    </Row>
    </Container>
  )
};

export default InputRow;
