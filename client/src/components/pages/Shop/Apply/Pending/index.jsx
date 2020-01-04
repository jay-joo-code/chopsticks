import React from 'react';
import { Link } from 'react-router-dom';
import RedButton from 'src/components/common/buttons/RedButton';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem 0 0 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

const Pending = () => (
  <div id="container">
    <Container>
      <div className="complete">
        <p className="tlt">샵 오픈 신청을 접수했습니다</p>
        <p className="txt">샵 오픈 신청을 해주셔서 감사합니다</p>
        <p className="txt">신청 결과는 일주일 내 개별 안내 드리겠습니다</p>
        <ButtonContainer>
          <Link to="/">
            <RedButton>홈으로 이동</RedButton>
          </Link>
        </ButtonContainer>
      </div>
    </Container>
  </div>
);

export default Pending;
