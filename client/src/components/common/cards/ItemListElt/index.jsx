import React, { useEffect } from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import { Link } from 'react-router-dom';
import log from 'src/util/log';
import api from 'src/util/api';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import { useSelector } from 'react-redux';
import ItemInfo from './ItemInfo';

const Container = styled.div`
  width: 100%;
  display: flex;
  margin: 1rem 0;
  background-color: white;
  padding: 1rem 1rem 1rem 0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  align-items: stretch;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    padding: 1rem;
  }
`;

const CondDisplay = styled.div`
  display: none;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    display: flex;
    align-items: center;
  }
`;

const CheckboxCont = styled.div`
  display: flex;
  align-items: center;
`;

const ImgCont = styled.div`
  position: relative;
  height: 150px;
  width: 150px;
  overflow: hidden;
  margin: 0 1rem;
`;

const Img = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  transform: translate(-50%,-50%);
`;

const InfoCont = styled.div`
  flex-grow: 2;
`;

const ListElt = ({
  cartObj, selectedItemId, setSelectedItemId, order, setV, v,
}) => {
  const { item } = cartObj;
  const isSelected = selectedItemId.includes(cartObj._id);
  const handleChange = (e) => {
    if (e.target.checked) {
      const newSelected = [cartObj._id, ...selectedItemId];
      setSelectedItemId(newSelected);
    } else {
      const newSelected = [...selectedItemId];
      newSelected.splice(newSelected.indexOf(cartObj._id), 1);
      setSelectedItemId(newSelected);
    }
  };

  // remove self from cart if item has been delete from db
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!item) {
      api.put(`/user/${user._id}/cart/delete/cartobj`, { cartObj })
        .then((res) => {
          fetchSelfAndStore(user._id);
        })
        .catch((e) => {
          log('ERROR delete cartobj from cart', e);
        });
    }
  }, []);

  return (
    <Container>
      <CondDisplay>
        <CheckboxCont>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={isSelected}
          />
        </CheckboxCont>
      </CondDisplay>
      <ImgCont>
        <Link to={`/item/${item._id}`}>
          <Img src={item.image} />
        </Link>
      </ImgCont>
      <InfoCont>
        <ItemInfo
          cartObj={cartObj}
          order={order}
          setV={setV}
          v={v}
        />
      </InfoCont>

    </Container>
  );
};

export default ListElt;
