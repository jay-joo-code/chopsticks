import React, { useState } from 'react';
import styled from 'styled-components';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import RoundBtn from 'src/components/common/buttons/RoundBtn';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`

`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Col = styled.div`
  margin: .5rem 0;
`;

const Input = styled(OutlinedInput)`
  margin: 0 .5rem .2rem 0;
`

const InputRow = ({ formik, index, optGrp }) => {
  const handleTitleChange = (e) => {
    let newOptGrps = [...formik.values.optGrps];
    newOptGrps[index].title = e.target.value;
    formik.setFieldValue('optGrps', newOptGrps);
  }
  
  const [name, setName] = useState('');
  
  const handleChange = (e, type) => {
    const text = e.target.value;
    
    if (text.includes(',')) {
      handleAddOpt();
      setName('');
    }
    else {
      setName(e.target.value);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddOpt();
      setName('');
    }
  }
  
  const handleAddOpt = () => {
    let newOptGrps = [...formik.values.optGrps];
    if (name === '') return;
    if (newOptGrps[index].opts.includes(name)) return;
    newOptGrps[index].opts.push(name)
    formik.setFieldValue('optGrps', newOptGrps);
  }
  
  const handleDeleteOtpGrp = () => {
    let newOptGrps = [...formik.values.optGrps];
    newOptGrps.splice(index, 1);
    formik.setFieldValue('optGrps', newOptGrps);
  }
  
  const deleteBtn = <RoundBtn onClick={handleDeleteOtpGrp}>x</RoundBtn>;

  const titleErrMsg = (formik.errors.optGrps && formik.errors.optGrps[index]) ? formik.errors.optGrps[index].title : '';
  const optsErrMsg = (formik.errors.optGrps && formik.errors.optGrps[index]) ? formik.errors.optGrps[index].opts : '';
  console.log('formik.errors :>> ', formik.errors);
  
  return (
    <Container>
      <Row>
        <Col>
          <Input
            label='옵션명'
            value={optGrp.title}
            onChange={handleTitleChange}
            placeholder='옵션 종류 ex) 색상'
            width={300}
            errMsg={titleErrMsg}
          />
        </Col>
        <Col>
          <Input
            label='옵션값'
            value={name}
            onChange={(e) => handleChange(e, 'name')}
            onKeyDown={handleKeyDown}
            placeholder='노란색, 파란색'
            width={300}
            sideButton={deleteBtn}
            errMsg={optsErrMsg}
          />
          <Body muted>*각 옵션은 쉼표로 분리해주세요</Body>
        </Col>
      </Row>
    </Container>
  )
};

export default InputRow;
