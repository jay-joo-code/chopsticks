import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from 'src/components/common/Icon';
import Button from 'src/components/common/Button';

const Container = styled.div`
  margin: 1rem 0;
`

const NameContainer = styled.div`
  padding: 0 1rem;
`;

const Name = styled.h3`
  color: ${(props) => props.theme.blue};
  opacity: 1;
`;

const Distance = styled.p`
  color: grey;
`;

const Poll = (props) => (
  <Container>
    <Link to={`/poll/${props._id}/stage`}>
      <Button>
        <NameContainer>
          <Name>{props.name}</Name>
        </NameContainer>
        <Distance>{props.distanceFromSource}m</Distance>
      </Button>
    </Link>
  </Container>
);

export default Poll;
