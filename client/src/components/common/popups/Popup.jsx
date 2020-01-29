import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  z-index: 50;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .4);
  transition: opacity 300ms;
  visibility: ${(props) => (props.display ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.display ? 1 : 0)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  z-index: 60;
  background-color: white;
  padding: 2rem;
  margin: 2rem;
  border-radius: 5px;
  position: relative;
  transition: all 5s ease-in-out;
  display: inline-block;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  text-align: right;
  font-size: 1rem;
  font-weight: bold;
  opacity: .8;
`;

const Content = styled.div`

`;

const Popup = ({ display, handleClosePopup, children}) => {
  const handleContainerClick = (e) => {
    e.stopPropagation();
  }
  return (
    <Overlay 
      display={display}
      onClick={handleClosePopup}
    >
      <Container onClick={handleContainerClick}>
        <Header>
          <CloseButton onClick={handleClosePopup}>x</CloseButton>
        </Header>
        <Content>
          {children}
        </Content>
      </Container>
    </Overlay>
  )
};

export default Popup;
