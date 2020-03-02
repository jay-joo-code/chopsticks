import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ErrMsg from 'src/components/common/form/ErrMsg';
import Policies from './Policies';
import ProdInfo from './ProdInfo';
import ProdDetails from './ProdDetails';
import SellerOpts from './SellerOpts';
import Btn from 'src/components/common/buttons/Btn';

const Container = styled.div`

`;

const BtnCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContents = ({ formik, _id }) => {
  // error msg
  const [hasErrors, setHasErrors] = useState(false);
  useEffect(() => {
    setHasErrors(Object.keys(formik.errors).length > 0);
  }, [formik.errors]);
  
  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <ProdInfo formik={formik} _id={_id} />
        <ProdDetails formik={formik} _id={_id} />
        <SellerOpts formik={formik} _id={_id} />
        <Policies formik={formik} />
        <BtnCont>
          <Btn type="submit"
            color='secondary'
            inverted
          >
            저장
          </Btn>
          {hasErrors && (
            <ErrMsg>입력하신 항목에 오류가 있습니다</ErrMsg>
          )}
        </BtnCont>
      </form>
    </Container>
  )
};

export default FormContents;
