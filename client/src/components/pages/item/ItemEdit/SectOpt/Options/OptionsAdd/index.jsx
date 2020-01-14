import React, { useState } from 'react';
import styled from 'styled-components';
import OutlinedInput from 'src/components/common/form/OutlinedInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputSect = styled.div`
  display: flex;
  align-items: center;
`;

const InputCont = styled.div`
  padding: 0 .5rem;
`;

const AddBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const AddBtnInner = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  opacity: .8;
`;


const OptionsAdd = ({ formik, name }) => {
  const [optionName, setOptionName] = useState('');
  const [priceChange, setPriceChange] = useState('');
  const handleName = (e) => setOptionName(e.target.value);
  const handlePriceChange = (e) => setPriceChange(e.target.value);
  const handleAddOption = () => {
    const data = {
      name: optionName,
      priceChange,
    };
    const newOptions = formik.values[name] || [];
    newOptions.push(data);
    formik.setFieldValue(name, newOptions);
  };
  return (
    <Container onSubmit={handleAddOption}>
      <InputSect>
        <InputCont>
          <OutlinedInput
            placeholder="옵션 이름"
            value={optionName}
            onChange={handleName}
          />
        </InputCont>
        <InputCont>
          <OutlinedInput
            placeholder="가격 변동"
            value={priceChange}
            onChange={handlePriceChange}
            sideText="원"
            right
          />
        </InputCont>
        <AddBtn onClick={handleAddOption}>
          <AddBtnInner>+</AddBtnInner>
        </AddBtn>
      </InputSect>
    </Container>
  );
};

export default OptionsAdd;
