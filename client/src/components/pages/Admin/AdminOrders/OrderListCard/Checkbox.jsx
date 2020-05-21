import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const Checkbox = ({ order, selected, setSelected }) => {
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    if (e.target.checked && !selected.includes(order._id)) {
      // selecting an unselected elt
      const newSelected = [...selected];
      newSelected.push(order._id);
      setSelected(newSelected);
    } else if (!e.target.checked && selected.includes(order._id)) {
      // unselecting a selected elt
      const newSelected = [...selected];
      newSelected.splice(selected.indexOf(order._id), 1);
      setSelected(newSelected);
    }
  };
  
  const handleClick = (e) => {
    e.stopPropagation();
  }

  return (
    <Container>
      <input
        type="checkbox"
        checked={selected.includes(order._id) ? 1 : 0}
        onChange={handleCheckboxChange}
        onClick={handleClick}
      />
    </Container>
  );
};

export default Checkbox;
