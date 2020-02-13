import React from 'react';
import styled from 'styled-components';
import DynamicContainer from 'src/components/layout/DynamicContainer';
import SearchBox from 'src/components/common/form/SearchBox';
import useIsMobile from 'src/util/hooks/useIsMobile';
import theme from 'src/theme';
import Logo from './Logo';
import Nav from './Nav';
import ExtendedNav from './ExtendedNav';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DyncCont = styled.div`
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
  const isMobile = useIsMobile();
  return (
    <div>
      <DynamicContainer>
        <Container>
          <LeftCont>
            <Logo />
            <DyncCont>
              <SearchBox />
            </DyncCont>
          </LeftCont>
          <Nav />
        </Container>
      </DynamicContainer>
      <ExtendedNav />
    </div>
  );
};

export default Header;
