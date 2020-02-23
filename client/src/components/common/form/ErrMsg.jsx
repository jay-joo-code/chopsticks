import React from 'react';
import styled from 'styled-components';
import ErrMsgFont from 'src/components/common/fonts/ErrMsg';

const ErrMsg = ({ children, ...rest }) => {
  
  return (
  <ErrMsgFont {...rest}>
    {children}
  </ErrMsgFont>
  )
};

export default ErrMsg;
