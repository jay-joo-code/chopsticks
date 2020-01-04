import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ShopSVG } from 'src/assets/svgs/shop.svg';
import Notification from 'src/components/common/Notification';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: .5rem;
  position: relative
`;

const ShopIcon = () => {
  const [notifCount, setNotifCount] = useState(0);

  return (
    <Link to="/shop">
      <Container>
        {notifCount > 0 && <Notification text={notifCount} /> }
        <ShopSVG />
      </Container>
    </Link>
  );
};

export default ShopIcon;
