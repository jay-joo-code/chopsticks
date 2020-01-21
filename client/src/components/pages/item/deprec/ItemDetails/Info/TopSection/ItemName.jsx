import React from 'react';
import styled from 'styled-components';
import DynamicInput from 'src/components/common/form/DynamicInput';

const Container = styled.div`
  color: ${(props) => props.theme.green};
  font-size: 2rem;
`;

const ItemName = (props) => (
  <Container>
    <DynamicInput
      name="name"
      init={props.name}
      updateUrl={`/api/item/${props._id}/update`}
      owner={props.owner}
      placeholder="작품 이름"
    />
  </Container>
);

export default ItemName;
