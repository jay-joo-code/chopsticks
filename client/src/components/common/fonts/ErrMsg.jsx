import React from 'react';
import styled from 'styled-components';

const Msg = styled.p`
  font-size: .8rem;
  color: #de6362;
  margin-top: .5rem;
`;

const ErrMsg = ({ children, formik, name, ...rest}) => {
  const hasError = formik ? formik.touched[name] && formik.errors[name] : false;
  
  if (children) return <Msg>{children}</Msg>;
  
  return (
    <div {...rest}>
      {hasError
        ? <ErrMsg>{formik.errors[name]}</ErrMsg>
        : null
      }
    </div>
  )
};    

export default ErrMsg;
