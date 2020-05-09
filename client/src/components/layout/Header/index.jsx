import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DynamicContainer from 'src/components/layout/DynamicContainer';
import SearchBox from 'src/components/common/form/SearchBox';
import theme from 'src/theme';
import Logo from './Logo';
import Nav from './Nav';
import ExtendedNav from './ExtendedNav';
import MobileSearch from './MobileSearch';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import useRouter from 'src/util/hooks/useRouter';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DesktopSearchBoxContainer = styled.div`
  display: none;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    display: block;
    margin-left: 2rem;
  }
`

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

  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.location])
  
  return (
    <Wrapper>
      <DynamicContainer>
        <Container>
          <LeftCont>
            <Logo />
            <DesktopSearchBoxContainer>
              <SearchBox />
            </DesktopSearchBoxContainer>
          </LeftCont>
          <Nav 
           enableSearch={enableSearch}
          />
        </Container>
      </DynamicContainer>
      <ExtendedNav />
      <MobileSearch
        expandSearch={expandSearch}
        disableSearch={disableSearch}
      />
    </Wrapper>
  );
};

export default Header;
