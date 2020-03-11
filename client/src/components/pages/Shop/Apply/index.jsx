import React from 'react';
import styled from 'styled-components';
import AppForm from './AppForm';
import Subheading from 'src/components/common/fonts/Subheading';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Title = styled(Subheading)`
  text-align: center;
`

const Apply = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  if (!user) {
    history.push('/login');
    return <div />;
  }
  
  return (
    <div id="container">
      <div className="shop_op2">
        <Title>샵 오픈 신청</Title>
        <AppForm />
      </div>
    </div>
  )
};

export default Apply;
