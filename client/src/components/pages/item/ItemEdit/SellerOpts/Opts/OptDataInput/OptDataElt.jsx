import React from 'react';
import styled from 'styled-components';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`
  margin: .5rem 0;
  display: flex;
  justify-content: space-between;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  
  & > * {
    margin-right: 1rem;
  }
`

const Input = styled(OutlinedInput)`
  
`

const Cross = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  opacity: .9;
  cursor: pointer;
`

const OptDataElt = ({ formik, i}) => {
  const opt = formik.values.optData[i];
  const handleChange = (e, field) => {
    const { value } = e.target;
    const isNumber = !isNaN(value);
    
    if (!isNumber) return;
    
    let newOpt = { ...opt };
    newOpt[field] = value;
    let newOptData = [...formik.values.optData];
    newOptData.splice(i, 1, newOpt);
    formik.setFieldValue('optData', newOptData);
  }
  
  const deleteOpt = () => {
    let newOptData = [...formik.values.optData];
    newOptData.splice(i, 1);
    formik.setFieldValue('optData', newOptData);
  }
  
  return (
    <Container>
      <OutlinedInput
        value={opt.optString}
        disabled
        width={220}
        center
      />
      <RightContainer>
        <Input
          value={opt.diff}
          right
          width={150}
          onChange={(e) => handleChange(e, 'diff')}
        />
        <Body>원</Body>
        <Input
          value={opt.qty}
          right
          width={150}
          onChange={(e) => handleChange(e, 'qty')}
        />
        <Body>개</Body>
        <Cross onClick={deleteOpt}>x</Cross>
      </RightContainer>
    </Container>
  )
};

export default OptDataElt;
