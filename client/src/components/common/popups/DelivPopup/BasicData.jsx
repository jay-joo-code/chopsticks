import React from 'react';
import styled from 'styled-components';
import Subheading from 'src/components/common/fonts/Subheading';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`
  
`;

const Data = styled.div`
  display: flex;
  margin: 1rem 0;
`

const Col = styled.div`
  margin: 0 .5rem;
  
  & > p {
    margin: .2rem 0;
  }
`

const BasicData = ({ data, company }) => {
  if (data.code === '105') {
    return (
      <div>{data.msg || ''}</div>
      )
  }
  
  if (data.result !== 'Y') {
    return (
      <div>유효하지 않은 송장번호 입니다</div>
      )
  }
  
  return (
    <Container>
      <Subheading>배송조회</Subheading>
      <Data>
      <Col>
        <Body>택배사</Body>
        <Body>송장번호</Body>
        <Body>보내는 분</Body>
        <Body>받는 분</Body>
        <Body>주소</Body>
      </Col>
      <Col>
        <Body strong>{company || ''}</Body>
        <Body strong>{data.invoiceNo}</Body>
        <Body strong>{data.senderName}</Body>
        <Body strong>{data.receiverName}</Body>
        <Body strong>{data.receiverAddr}</Body>
      </Col>
      </Data>
    </Container>
  )
};

export default BasicData;
