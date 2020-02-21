import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.primary};
  display: flex;
  justify-content: center;
  padding: .5rem 0;
  display: ${props => props.show ? 'block' : 'none'};
`;

const Msg = styled.p`
  color: white;
  text-align: center;
  font-size: .8rem;
`

const Alert = ({ show, setShow, msg }) => {
  useEffect(() => {
    if (show) {
      setTimeout(() => setShow(false), 3000);
    }
  }, [show])
  return (
    <Container
      show={show}
    >
      <Msg>{msg}</Msg>
    </Container>
  )
};

export default Alert;