import React, { useState } from 'react';
import styled from 'styled-components';
import Popup from 'src/components/common/popups/Popup';
import List from './List';
import DeliveryForm from './DeliveryForm';


const DeliveryPopup = ({ display, user, handleClosePopup }) => {
  const initData = {
    defaultIndex: 0,
    options: [],
  };
  const deliveryInfo = user.deliveryInfo || initData;
  const { options, defaultIndex } = deliveryInfo;
  const [view, setView] = useState('list');
  return (
    <Popup
      display={display}
      handleClosePopup={handleClosePopup}
    >
      {view === 'list' && (
      <List
        options={options}
        defaultIndex={defaultIndex}
        setView={setView}
        user={user}
      />
      )}
      {view === 'form' && (
      <DeliveryForm
        setView={setView}
        user={user}
      />
      )}
    </Popup>
  );
};

export default DeliveryPopup;
