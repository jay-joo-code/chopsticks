import React from 'react';
import styled from 'styled-components';
import DeliveryDetailCard from 'src/components/common/cards/DeliveryDetailCard';
import RedButton from 'src/components/common/buttons/RedButton';
import axios from 'axios';
import log from 'src/util/log';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.div`
  margin: 1rem 0;
  min-width: 10rem;
`;

const ListComp = ({ options, defaultIndex, setView, user }) => {
  const viewToForm = () => {
    setView('form')
  }
  
  const handleCardClick = (i) => {
    const data = { defaultIndex: i }
    axios.put(`/api/user/${user._id}/delivery-info/default-index/update`, data)
      .then(() => fetchSelfAndStore(user._id))
      .catch((e) => {
        log(`ERROR update defaultIndex`, e);
      })
  }
  
  const handleCardDelete = (i) => {
    axios.put(`/api/user/${user._id}/delivery-info/delete/${i}`)
      .then(() => fetchSelfAndStore(user._id))
      .catch((e) => {
        log(`ERROR update defaultIndex`, e);
      })
  }
  
  return (
    <Container>
      <p>배송지 선택</p>
      <List>
        {options.map((opt, i) => (
          <DeliveryDetailCard
            key={opt._id}
            recipient={opt.recipient}
            address={opt.address}
            addressDetail={opt.addressDetail}
            mobile={opt.mobile}
            selected={defaultIndex === i ? 1 : 0}
            handleClick={() => handleCardClick(i)}
            handleDelete={() => handleCardDelete(i)}
            actions
          />
        ))}
      </List>
      <RedButton green rounded onClick={viewToForm}>배송지 추가</RedButton>
    </Container>
  )
};

export default ListComp;
