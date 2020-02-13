import React from 'react';
import styled from 'styled-components';

const DyncCont = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: inline-block;
  z-index: 30;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SideCont = styled.div`
  margin: 1rem;
`;

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
  opacity: .8;
  margin-bottom: .5rem;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.green};
`;

const FixedBottomPanel = ({ text, supportText, button }) => (
  <Container>
    <DyncCont>
      <Container>
        <SideCont>
          <Name>{text}</Name>
          <Price>{supportText}</Price>
        </SideCont>
        <SideCont>
          {button}
        </SideCont>
      </Container>
    </DyncCont>
  </Container>
);

export default FixedBottomPanel;
