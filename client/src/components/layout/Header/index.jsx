import React from 'react';
import styled from 'styled-components';
import DynamicContainer from 'src/components/layout/DynamicContainer';
import Logo from './Logo';
import Nav from './Nav';
import ExtendedNav from './ExtendedNav';
import SearchBox from 'src/components/common/form/SearchBox';
import useIsMobile from 'src/util/hooks/useIsMobile';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftCont = styled.div`
  display: flex;
  align-items: center;
`

const Header = () => {
  const isMobile = useIsMobile();
  return (
  <div>
    <DynamicContainer>
      <Container>
        <LeftCont>
          <Logo />
          {!isMobile && <SearchBox />}
        </LeftCont>
        <Nav />
      </Container>
    </DynamicContainer>
    <ExtendedNav />
  </div>
  )
};

export default Header;
