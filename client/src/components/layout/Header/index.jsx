import React, { useState } from 'react';
import styled from 'styled-components';
import DynamicContainer from 'src/components/layout/DynamicContainer';
import SearchBox from 'src/components/common/form/SearchBox';
import theme from 'src/theme';
import Logo from './Logo';
import Nav from './Nav';
import ExtendedNav from './ExtendedNav';
import MobileSearch from './MobileSearch';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RenderDesktop = styled.div`
  display: none;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    display: block;
  }
`;

const LeftCont = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const [expandSearch, setExpandSearch] = useState(false);
  const enableSearch = () => {
    disableBodyScroll();
    setExpandSearch(true);
  }
  const disableSearch = () => {
    clearAllBodyScrollLocks();
    setExpandSearch(false);
  }
  
  return (
    <Wrapper>
      <DynamicContainer>
        <Container>
          <LeftCont>
            <Logo />
            <RenderDesktop>
              <SearchBox />
            </RenderDesktop>
          </LeftCont>
          <Nav 
           enableSearch={enableSearch}
          />
        </Container>
      </DynamicContainer>
      <ExtendedNav />
      <MobileSearch
        expandSearch={expandSearch}
        enableSearch={enableSearch}
        disableSearch={disableSearch}
      />
    </Wrapper>
  );
};

export default Header;
