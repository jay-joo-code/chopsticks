import React from 'react';
import styled from 'styled-components';
import Subheading from 'src/components/common/fonts/Subheading';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`

`;

const MsgContainer = styled.div`
  margin: .5rem 0 1rem 0;
`

const StateMsg = ({ order, stateType }) => {
  
  if (!order) return <div />;
  if (!order.state.includes('exchange') && !order.state.includes('refund') && !order.state.includes('cancel')) {
    return <div />;
  }
  
  return (
    <Container>
      <Subheading>{stateType + '사유'}</Subheading>
      <MsgContainer>
        <Body>{order.stateMsg}</Body>
      </MsgContainer>
    </Container>
  )
};

export default StateMsg;
