import React from 'react';
import styled from 'styled-components';
import useScript from 'src/util/hooks/useScript';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import OutlinedButton from 'src/components/common/buttons/OutlinedButton';
import {ReactComponent as SearchIconRaw } from 'src/assets/svgs/magnifier.svg';

const Container = styled.div`

`;

const SearchIcon = styled(SearchIconRaw)`
  
`

const AddressInput = ({ formik }) => {
  useScript('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
  
  const initPostcode = () => {
    new window.daum.Postcode({
        oncomplete: function(data) {
          const addrString = `${data.address}, ${data.bname}, ${data.buildingName}`;
          formik.setFieldValue('address', addrString)
        }
      }).open();
  }
  
  const btn = (
    <OutlinedButton
      type='button'
      onClick={initPostcode}
    >
      <SearchIcon />
    </OutlinedButton>
    )
  
  return (
    <Container>
      <OutlinedInput
        name="address"
        label="주소"
        placeholder='우편번호 검색'
        formik={formik}
        disabled
        sideButton={btn}
        
      />
    </Container>
  )
};

export default AddressInput;
