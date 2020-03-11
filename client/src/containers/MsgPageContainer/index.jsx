import React from 'react';
import styled from 'styled-components';
import Body from 'src/components/common/fonts/Body';
import Heading from 'src/components/common/fonts/Heading';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8rem 0;
`

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, .1);
  padding: 2rem;
  max-width: 460px;
  text-align: center;
`;

const Text = styled(Body)`
  margin: 2rem 0;
`

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`

const MsgPageContainer = ({ title, msg, btn}) => {
  return (
    <Wrapper>
      <Container>
        <Heading>{title}</Heading>
        <Text>{msg}</Text>
        <BtnContainer>
          {btn} 
        </BtnContainer>
      </Container>
    </Wrapper>
  )
};

export default MsgPageContainer;
