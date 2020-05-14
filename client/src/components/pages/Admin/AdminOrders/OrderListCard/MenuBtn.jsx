import React from 'react';
import styled from 'styled-components';

const DotContainer = styled.button`
  padding: 0 1rem;
  background: inherit;
  z-index: 20;
`;

const Dot = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  opacity: .8;
  line-height: 0rem;
  margin-bottom: .4rem;
`;

const MenuBtn = ({ showMenu, setShowMenu }) => {
  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <DotContainer
      type="button"
      onClick={toggleMenu}
    >
      <Dot>.</Dot>
      <Dot>.</Dot>
      <Dot>.</Dot>
    </DotContainer>
  );
};

export default MenuBtn;
