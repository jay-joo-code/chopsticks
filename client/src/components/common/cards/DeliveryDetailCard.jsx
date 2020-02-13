import React from 'react';
import styled from 'styled-components';
import log from 'src/util/log';

const Container = styled.div`
  width: 100%;
  min-width: 20rem;
  padding: 1rem;
  background-color: ${(props) => (props.selected ? props.theme.green : 'white')};
  border-radius: 10px;
  color: ${(props) => (props.selected ? 'white' : 'black')};
  margin: .5rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  aligin-items: center;
`;

const Recipient = styled.h3`
  font-size: 1.2rem;
`;

const Cross = styled.p`

`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: .5rem;
`;

const Data = styled.div`

`;

const DataSection = styled.div`
  margin: .4rem 0;
`;

const Details = styled.p`
  font-size: .8rem;
  margin: .2rem 0;
`;

const Actions = styled.div`
  
`;

const Btn = styled.button`
  text-decoration: underline;
  font-size: .8rem;
  background-color: inherit;
`;

const DeliveryDetailCard = ({
  recipient, address, addressDetail, mobile, selected, actions, handleClick, handleDelete,
}) => {
  const dynamicClick = () => {
    actions && handleClick();
  };

  const dynamicDelete = () => {
    actions && handleDelete();
  };

  return (
    <Container
      selected={selected}
      onClick={dynamicClick}
    >
      <Header>
        <Recipient>{recipient}</Recipient>
        {actions && (<Cross onClick={dynamicDelete}>X</Cross>)}
      </Header>
      <Body>
        <Data>
          <DataSection>
            <Details>{address}</Details>
            <Details>{addressDetail}</Details>
          </DataSection>
          <Details>{mobile}</Details>
        </Data>
        {actions && (
        <Actions>
          {false && <Btn>수정</Btn>}
        </Actions>
        )}
      </Body>
    </Container>
  );
};

export default DeliveryDetailCard;
