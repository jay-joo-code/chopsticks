import React from 'react';
import styled from 'styled-components';
import AppForm from './AppForm';
import Subheading from 'src/components/common/fonts/Subheading';

const Title = styled(Subheading)`
  text-align: center;
`

const Apply = () => (
  <div id="container">
    <div className="shop_op2">
      <Title>샵 오픈 신청</Title>
      <AppForm />
    </div>
  </div>
);

export default Apply;
