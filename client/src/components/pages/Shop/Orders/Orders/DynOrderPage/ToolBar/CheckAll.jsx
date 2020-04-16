import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  margin-right: .5rem !important;
`

const CheckAll = ({ orders, selected, setSelected }) => {
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
      <Input
          type="checkbox"
          checked={allSelected}
          onChange={handleCheckboxChange}
        />
        <Body>모두선택</Body>
    </Container>
  )
};

export default CheckAll;
