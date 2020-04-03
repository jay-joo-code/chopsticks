import React, { useEffect } from 'react';
import styled from 'styled-components';
import Btn from 'src/components/common/buttons/Btn';
import SearchBox from 'src/components/common/form/SearchBox';
import { useLocation } from 'react-router-dom';

const Container = styled.div`

`;

const MobileSearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`

const Modal = styled.div`
  position: fixed;
  top: 14rem;
  bottom: 0;
  left: 0;
  right: 0;
  flex-grow: 2;
  background: rgba(0, 0, 0, .6);
  z-index: 50;
  cursor: pointer;
`

const RenderMobile = styled.div`
  display: block;
  flex-grow: 2;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    display: none;
  }
`;

const MobileSearch = ({ expandSearch, disableSearch }) => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    if (pathname !== '/browse') disableSearch();
  }, [pathname])
  
  return (
    <Container>
      <RenderMobile>
        {expandSearch && (
          <MobileSearchContainer>
            <SearchBox autoFocus onSubmit={disableSearch}/>
            <Btn
              onClick={disableSearch}
              color='danger'
            >
            취소
            </Btn>
          </MobileSearchContainer>
        )}
        {expandSearch && <Modal onClick={disableSearch} />}
      </RenderMobile>
    </Container>
  )
};

export default MobileSearch;
