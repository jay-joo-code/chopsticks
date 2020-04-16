import React from 'react';
import styled from 'styled-components';
import Body from 'src/components/common/fonts/Body';
import Btn from 'src/components/common/buttons/Btn';

const Container = styled.div`
  display: flex;
  align-items: stretch;
`;  

const Section = styled.div`
  // left
  border-right: ${props => props.left ? '1px solid grey' : ''};
  padding-right: ${props => props.left ? '1rem' : ''};
  
  // right
  padding-left: ${props => props.right ? '1rem' : ''};
`

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

const Bold = styled(Body)`
  font-weight: bold;
`

const Img = styled.img`
  object-fit: cover;
  height: 7rem;
  width: 7rem;
  background: rgba(0, 0, 0, .05);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  flex-shrink: 0;
`;

const ActiveShopContents = ({ user }) => {
  return (
    <Container>
    <Section left>
      <Row>
        <LeftCol>
          <Bold>Shop Name</Bold>
        </LeftCol>
        <Bold>{user.shop.title}</Bold>
      </Row>
      <Row>
        <LeftCol>
          <Body>Email</Body>
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
      <Row>
        <LeftCol>
          <Body>가입일자</Body>
        </LeftCol>
        <Body>{user.createdAt}</Body>
      </Row>
    </Section>
    <Section right>
      <Row>
        <LeftCol>
          <Body>사업자 등록증</Body>
        </LeftCol>
        {user.shop.certification
          ? (
              <a
                href={user.shop.certification}
                download
                target="_blank"
              >
              <Img
                src={user.shop.certification}
              />
              </a>
          )
          : <Body>없음</Body>
        }
      </Row>
      <Row>
        <LeftCol>
          <Body>통신판매업 신고번호</Body>
        </LeftCol>
        <Body>{user.shop.reportNumber || '없음'}</Body>
      </Row>
      <Row>
        <LeftCol>
          <Body>계좌정보</Body>
        </LeftCol>
        {user.shop.account 
          ? (
          <div>
            <Body>{user.shop.account.owner}</Body>
            <Body>{`${user.shop.account.bank}, ${user.shop.account.number}`}</Body>
          </div>
          )
          : <Body>없음</Body>
        }
      </Row>
    </Section>
    </Container>
  )
};

export default ActiveShopContents;
