import React, { useState } from 'react';
import styled from 'styled-components';
import DynamicInput from 'src/components/common/form/DynamicInput'; 
import { useSelector } from 'react-redux';

const Container = styled.div`
  color: ${props => props.theme.green};
  font-size: 2rem;
`;

const ItemName = (props) => {
  const userId = useSelector((state) => state.user._id);
  const editable = props.owner ? userId === props.owner._id : false;
  
  return (
    <Container>
      {editable
        ? <DynamicInput name='name' init={props.name} updateUrl={`/api/item/${props._id}/update`} />
        : <p>{props.name}</p> 
      }
    </Container>
  )
};

export default ItemName;
