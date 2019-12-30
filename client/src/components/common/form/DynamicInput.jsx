import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { debounce } from 'throttle-debounce';
import axios from 'axios';
import log from 'src/util/log';
import { useSelector } from 'react-redux'

const StyledDynamicInput = styled.input `
    border: none;
    background-color: inherit;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    box-sizing: border-box;
    width: 100%;
    text-align: inherit;
    border-bottom: 1px solid grey;
    
    &:disabled {
      border-bottom: none;
    }
  `;

const DynamicInput = (props) => {
  const { name, init, updateUrl, owner, parentHandleChange } = props;
  const [value, setValue] = useState(init);
  const user = useSelector((state) => state.user);
  const userId = user ? user._id : null;
  const isOwner = owner ? userId === owner._id : false;

  const handleChange = (e) => {
    if (parentHandleChange) {
      parentHandleChange(e);
    }
    setValue(e.target.value);
  }

  const update = () => {
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

  useEffect(() => {
    setValue(init);
  }, [init])

  useEffect(() => {
    if (isOwner) {
      update();
    }
  }, [value])

  return (
    <StyledDynamicInput value={value} onChange={handleChange} disabled={!isOwner} {...props} />
  )
};

export default DynamicInput;
