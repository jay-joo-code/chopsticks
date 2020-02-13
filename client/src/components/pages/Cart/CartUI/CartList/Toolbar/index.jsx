import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RedButton from 'src/components/common/buttons/RedButton';
import theme from 'src/theme';
import axios from 'axios';
import log from 'src/util/log';
import { useSelector } from 'react-redux';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';

const CondDisplay = styled.div`
  display: none;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    display: block;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  width: 100%;
`;

const CheckboxCont = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  margin-left: .5rem;
  opacity: .8;
`;

const Toolbar = ({ cart, selectedItemId, setSelectedItemId }) => {
  const [allSelected, setAllSelected] = useState();
  const handleChange = (e) => {
    if (e.target.checked) {
      // SET ALL CARTOBJ AS CHECKED
      setSelectedItemId(cart.map((cartObj) => cartObj._id));
    } else {
      // SET ALL AS UNCHECKED
      setSelectedItemId([]);
    }
  };
  useEffect(() => {
    let accum = true;
    cart.map((cartObj) => accum = accum && selectedItemId.includes(cartObj._id));
    setAllSelected(accum);
  }, [cart, selectedItemId]);

  const user = useSelector((state) => state.user);
  const removeSelected = () => {
    const url = `/api/user/${user._id}/cart/delete-many/cartobj`;
    axios.put(url, { removeIds: selectedItemId })
      .then((res) => {
        fetchSelfAndStore(user._id);
      })
      .catch((e) => {
        log('ERROR remove selected from cart');
      });
  };

  return (
    <CondDisplay>
      <Container>
        <CheckboxCont>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={allSelected || false}
          />
          <Label>전체선택</Label>
        </CheckboxCont>
        <RedButton onClick={removeSelected}>선택삭제</RedButton>
      </Container>
    </CondDisplay>
  );
};

export default Toolbar;
