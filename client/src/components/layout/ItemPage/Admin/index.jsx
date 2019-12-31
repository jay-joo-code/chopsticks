import React from 'react';
import styled from 'styled-components';
import useIsOwner from 'src/util/hooks/useIsOwner';
import Badge from 'src/components/common/Badge';
import { ReactComponent as Padlock } from 'src/assets/svgs/padlock.svg';

const Container = styled.div`
  padding: 0 0 2rem 0;
  font-size: .7rem;
`;

const StyledPadlock = styled(Padlock)`
  height: .7rem;
  width: .7rem;
  opacity: .8;
  margin: 0 .2rem 0 0;
`;

const TextContainer = styled.div`
  padding: .5rem 0;
`;

const Text = styled.p`
  opacity: .7;
  padding: .2rem 0;
`;

const Admin = () => {
  const isOwner = useIsOwner();

  if (!isOwner) return <div />;

  return (
    <Container>
      <Badge>
        <StyledPadlock />
관리자 모드
      </Badge>
      <TextContainer>
        <Text>다른 유저들은 상품 정보를 수정하지 못합니다</Text>
      </TextContainer>
    </Container>
  );
};

export default Admin;
