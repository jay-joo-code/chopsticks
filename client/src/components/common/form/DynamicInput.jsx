import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { debounce } from 'throttle-debounce';
import axios from 'axios';
import log from 'src/util/log';

const StyledDynamicInput = styled.input `
  border: none;
  background-color: inherit;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  box-sizing: border-box;
  width: 100%
`;

const DynamicInput = (props) => {
  const { name, init, updateUrl } = props;
  const [value, setValue] = useState(init);
  const handleChange = (e) => {
    log('handleChange')
    setValue(e.target.value);
  }
  
  const update = () => {
    log('update')
    let data = {};
    data[name] = value;
    axios.put(updateUrl, data)
      .then((res) => {
        log('UPDATE dynamic input', res);
      })
      .catch((e) => {
        log(`ERROR updating dynamic input ${name}`, e);
      })
  }

  // const debouncedUpdate = debounce(3000, update);
  
  useEffect(() => {
    update();
  }, [value])
  
  return (
    <StyledDynamicInput value={value} onChange={handleChange} />
  )
};

export default DynamicInput;
