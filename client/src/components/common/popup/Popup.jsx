import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  z-index: 50;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .2);
  transition: opacity 500ms;
  visibility: ${props => props.display ? 'visible' : 'hidden'};
  opacity: ${props => props.display ? 1 : 0};
`

const Container = styled.div`
  background-color: white;
  padding: 2rem;
  margin: 2rem;
  border-radius: 5px;
  position: relative;
  transition: all 5s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CloseButton = styled.button`
  text-align: right;
  font-size: 1rem;
  font-weight: bold;
  opacity: .8;
`

const Content = styled.div`

`

const Popup = (props) => {
  return (
    <Overlay display={props.display}>
      <Container>
        <Header>
          <CloseButton onClick={props.handleClosePopup}>x</CloseButton>
        </Header>
        <Content>
        {props.children}
        </Content>
      </Container>
    </Overlay>
  )
};

export default Popup;
