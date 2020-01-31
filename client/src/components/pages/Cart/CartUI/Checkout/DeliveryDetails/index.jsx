import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import RedButton from 'src/components/common/buttons/RedButton';
import DeliveryDetailCard from 'src/components/common/cards/DeliveryDetailCard';
import DeliveryPopup from './DeliveryPopup';

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const StyledBtn = styled(RedButton)`
  font-size: .8rem;
  padding: .5rem;
`

const Warning = styled.p`
  margin: 2rem 0;
  opacity: .8;
  text-align: center;
`

const DeliveryDetails = () => {
  const [displayPopup, setDisplayPopup] = useState(0);
  const handleClick = () => {
    setDisplayPopup(1);
  }
  const handleClosePopup = () => {
    setDisplayPopup(0)
  }
  const user = useSelector((state) => state.user);
  const hasDeliveryDetails = user.deliveryInfo && user.deliveryInfo.options.length;
  const selectedData = user.deliveryInfo && user.deliveryInfo.options[user.deliveryInfo.defaultIndex]
  
  return (
    <Container>
      <Header>
        <p>배송정보</p>
        <StyledBtn green rounded onClick={handleClick}>배송지 추가 / 변경</StyledBtn>
      </Header>
      {hasDeliveryDetails 
      ? (<DeliveryDetailCard
          {...selectedData}
          selected
      />)
      : (<Warning>배송지 정보를 추가해 주세요</Warning>)}
      
      <DeliveryPopup
        user={user}
        display={displayPopup}
        handleClosePopup={handleClosePopup}
      />
    </Container>
  )
};

export default DeliveryDetails;
