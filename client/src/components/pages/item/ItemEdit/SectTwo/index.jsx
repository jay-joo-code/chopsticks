import React from 'react';
import styled from 'styled-components';
import SectCont from './../SectCont';
import Option from './Option';
import NewOption from './NewOption';

const AddSect = styled.div`

`;

const ViewSect = styled.div`

`

const SectTwo = ({ formik, options, setOptions }) => {
  return (
    <SectCont>
      <AddSect>
        <NewOption
          options={options}
          setOptions={setOptions}
        />
      </AddSect>
      <ViewSect>
      {options.map((option, i) => (
        <Option key={i} option={option} />
      ))}
      </ViewSect>
    </SectCont>
  )
};

export default SectTwo;
