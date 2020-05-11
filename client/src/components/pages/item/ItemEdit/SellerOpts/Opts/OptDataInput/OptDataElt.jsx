import React from 'react';
import styled from 'styled-components';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import Body from 'src/components/common/fonts/Body';
import Subheading from 'src/components/common/fonts/Subheading';

const Container = styled.div`
  margin: .5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Combination = styled(Subheading)`
  max-width: 120px;
  word-break: break-word;
  white-space: pre-line;

  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    max-width: 300px;
  }
`

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    & > * {
      margin-right: 1rem;
    }
  }
`

const InputContainer = styled.div`
  width: 80px;
  margin-left: .5rem;

  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    width: 150px;
  }
`

const SideText = styled(Body)`
  margin-left: .5rem;
`

const Cross = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  opacity: .9;
  cursor: pointer;
  margin-left: .5rem;
`

const OptDataElt = ({ formik, i }) => {
  const opt = formik.values.optData[i];
  const handleChange = (e, field) => {
    const { value } = e.target;
    const isNumber = !isNaN(value);
    
    if (!isNumber) return;
    
    const newOpt = { ...opt };
    newOpt[field] = value;
    const newOptData = [...formik.values.optData];
    newOptData.splice(i, 1, newOpt);
    formik.setFieldValue('optData', newOptData);
  }
  
  const deleteOpt = () => {
    const newOptData = [...formik.values.optData];
    newOptData.splice(i, 1);
    formik.setFieldValue('optData', newOptData);
  }
  
  return (
    <Container>
      <Combination>{opt.optString}</Combination>
      <RightContainer>
        <InputContainer>
          <OutlinedInput
            value={opt.diff}
            right
            onChange={(e) => handleChange(e, 'diff')}
          />
        </InputContainer>
        <SideText>원</SideText>
        <InputContainer>
          <OutlinedInput
            value={opt.qty}
            right
            disabled={formik.values.madeOnOrder}
            onChange={(e) => handleChange(e, 'qty')}
          />
        </InputContainer>
        <SideText>개</SideText>
        <Cross onClick={deleteOpt}>x</Cross>
      </RightContainer>
    </Container>
  )
};

export default OptDataElt;
