import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ActionBtn from './ActionBtn';

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
  
  & > p {
    padding: 0 .5rem;
  }
`;

const ToolBar = ({
  btn, selected, setSelected, orders, state,
}) => {
  const [allSelected, setAllSelected] = useState(0);

  // whenever selected changes, check if all is selected
  useEffect(() => {
    if (selected.length === orders.length) setAllSelected(1);
    else setAllSelected(0);
  }, [selected, orders]);

  // handle toolbar checkbox click
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      const allIds = orders.map((doc) => doc._id);
      setSelected(allIds);
    } else if (!e.target.checked) {
      setSelected([]);
    }
  };

  return (
    <Container>
      <ToolBarContainer>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={handleCheckboxChange}
        />
        <p>모두선택</p>
      </ToolBarContainer>
    </Container>
  );
};

export default ToolBar;
