import React from 'react';
import styled from 'styled-components';
import CheckAll from './CheckAll';
import ConditionalBtns from './ConditionalBtns';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const ToolBarContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ToolBar = ({
  btn, selected, setSelected, orders, state, v, setV
}) => {
  
  return (
    <Container>
      <ToolBarContainer>
        <CheckAll
          orders={orders}
          selected={selected}
          setSelected={setSelected}
        />
        <ConditionalBtns
          state={state}
          selected={selected}
          setSelected={setSelected}
          v={v}
          setV={setV}
        />
      </ToolBarContainer>
    </Container>
  );
};

export default ToolBar;
