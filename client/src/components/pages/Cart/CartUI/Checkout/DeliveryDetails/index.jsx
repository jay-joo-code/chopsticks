import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import RedButton from 'src/components/common/buttons/RedButton';
import DeliveryDetailCard from 'src/components/common/cards/DeliveryDetailCard';
import DeliveryPopup from './DeliveryPopup';
import UserInfo from './UserInfo';
import Subheading from 'src/components/common/fonts/Subheading';
import MethodSelector from './MethodSelector';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    justify-content: space-between;
  }
`;

const Section = styled.div`
  min-width: 200px;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const StyledBtn = styled(RedButton)`
  font-size: .8rem;
  padding: .5rem;
`;

const Warning = styled.p`
  margin: 2rem 0;
  opacity: .8;
  text-align: center;
`;

const DeliveryDetails = ({ method, setMethod }) => {
  const [displayPopup, setDisplayPopup] = useState(0);
  const handleClick = () => {
    setDisplayPopup(1);
  };
  const handleClosePopup = () => {
    setDisplayPopup(0);
  };
  const user = useSelector((state) => state.user);
  const hasDeliveryDetails = user.deliveryInfo && user.deliveryInfo.options.length;
  const selectedData = user.deliveryInfo && user.deliveryInfo.options[user.deliveryInfo.defaultIndex];

  return (
    <Container>
      <Section>
        <Subheading>주문 고객</Subheading>
        <UserInfo user={user} />
      </Section>
      <Section>
        <StyledBtn green rounded onClick={handleClick}>배송지 추가 / 변경</StyledBtn>
        {hasDeliveryDetails
          ? (
            <DeliveryDetailCard
              {...selectedData}
              selected
            />
          )
          : (<Warning>배송지 정보를 추가해 주세요</Warning>)}
  
        <DeliveryPopup
          user={user}
          display={displayPopup}
          handleClosePopup={handleClosePopup}
        />
      </Section>
      <Section>
        <Subheading>결제 방법</Subheading>
        <MethodSelector
          method={method}
          setMethod={setMethod}
        />
      </Section>
    </Container>
  );
};

export default DeliveryDetails;
