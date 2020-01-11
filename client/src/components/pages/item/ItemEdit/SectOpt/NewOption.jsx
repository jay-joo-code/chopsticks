import React, { useState } from 'react';
import styled from 'styled-components';
import OutlinedButton from 'src/components/common/buttons/OutlinedButton';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import log from 'src/util/log';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const InputSect = styled.div`
  display: flex;
`

const NewOption = ({ options, setOptions }) => {
  const [name, setName] = useState('');
  const [priceChange, setPriceChange] = useState('');
  const handleName = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPriceChange(e.target.value);
  const handleAddOption = () => {
    const data = {
      name, 
      priceChange
    }
    let newOptions = [...options];
    newOptions.push(data);
    setOptions(newOptions);
  }
  return (
    <Container onSubmit={handleAddOption}>
    <InputSect>
          <OutlinedInput
            name='name'
            placeholder='옵션 이름'
            value={name}
            onChange={handleName}
          />
          <OutlinedInput
            name='priceChange'
            placeholder='가격 차이'
            value={priceChange}
            onChange={handlePriceChange}
          />
          </InputSect>
          <OutlinedButton type='submit'>옵션 추가</OutlinedButton>
        </Container>
  )
};

export default NewOption;
