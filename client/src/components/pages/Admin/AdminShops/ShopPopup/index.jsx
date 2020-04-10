import React from 'react';
import styled from 'styled-components';
import Popup from 'src/components/common/popups/Popup';

import DisabledShopContents from './DisabledShopContents';
import ActiveShopContents from './ActiveShopContents';

const Container = styled.div`
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    min-width: 500px;
  }
`;

const ShopPopup = ({ display, handleClosePopup, user, setShopState, type }) => {
  if (!display || !user) return <div />;
  
  return (
    <Popup
      display={display}
      title={type === 'disabled' ? '샵 오픈 신청' : '샵 정보'}
      handleClosePopup={handleClosePopup}
    >
      <Container>
        {type === 'disabled' && (
          <DisabledShopContents 
            user={user}
            setShopState={setShopState}
            handleClosePopup={handleClosePopup}
          />
        )}
        {type === 'active' && (
          <ActiveShopContents 
            user={user}
          />
        )}
      </Container>
    </Popup>
  )
};

export default ShopPopup;
