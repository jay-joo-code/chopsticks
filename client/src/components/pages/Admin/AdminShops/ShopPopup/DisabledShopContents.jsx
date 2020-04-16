import React from 'react';
import styled from 'styled-components';
import Body from 'src/components/common/fonts/Body';
import Btn from 'src/components/common/buttons/Btn';

const Container = styled.div`

`;

const Row = styled.div`
  display: flex;
  padding: .4rem 0;
  
  & > p {
    max-width: 600px;
  }
`

const LeftCol = styled.div`
  width: 120px;
  padding: 0 .2rem;
  margin-right: .2rem;
`

const HoriLine = styled.div`
  border-bottom: 1px solid grey;
  width: 100%;
  margin: 1rem 0;
` 

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  
  & > button {
    margin: 0 .2rem;
  }
`

const DisabledShopContents = ({ user, setShopState, handleClosePopup }) => {
  const handleAcceptClick = () => {
    setShopState(user._id, user.shop, true)
    handleClosePopup();
  }
  
  return (
    <Container>
      <Row>
        <LeftCol>
          <Body>이메일</Body>
        </LeftCol>
        <Body>{user.email}</Body>
      </Row>
      <Row>
        <LeftCol>
          <Body>이름</Body>
        </LeftCol>
        <Body>{user.name}</Body>
      </Row>
      <Row>
        <LeftCol>
          <Body>휴대전화</Body>
        </LeftCol>
        <Body>{user.mobile}</Body>
      </Row>
      <HoriLine />
      <Row>
        <LeftCol>
          <Body>Shop Name</Body>
        </LeftCol>
        <Body>{user.shop.title}</Body>
      </Row>
      <Row>
        <LeftCol>
          <Body>샵 소개</Body>
        </LeftCol>
        <Body>{user.shop.intro}</Body>
      </Row>
      <HoriLine />
      <ButtonSection>
        <Btn onClick={handleAcceptClick}>수락</Btn>
        <Btn inverted>거절</Btn>
      </ButtonSection>
    </Container>
  )
};

export default DisabledShopContents;
