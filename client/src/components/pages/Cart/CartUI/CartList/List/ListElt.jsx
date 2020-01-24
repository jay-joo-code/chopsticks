import React from 'react';
import styled from 'styled-components';
import ItemInfo from './ItemInfo';
import theme from 'src/theme';
import { Link } from 'react-router-dom';

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
`

const CheckboxCont = styled.div`
  display: flex;
  align-items: center;
`

const ImgCont = styled.div`
  position: relative;
  height: 150px;
  width: 150px;
  overflow: hidden;
  margin: 0 1rem;
`

const Img = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  transform: translate(-50%,-50%);
`

const InfoCont = styled.div`
  flex-grow: 2;
`

const ListElt = ({ cartObj, selectedItemId, setSelectedItemId }) => {
  const { item } = cartObj;
  const isSelected = selectedItemId.includes(cartObj._id);
  const handleChange = (e) => {
    if (e.target.checked) {
      const newSelected = [cartObj._id, ...selectedItemId];
      setSelectedItemId(newSelected);
    }
    else {
      let newSelected = [...selectedItemId];
      newSelected.splice(newSelected.indexOf(cartObj._id), 1);
      setSelectedItemId(newSelected);
    }
  }
  
  return (
    <Container>
      <CondDisplay>
        <CheckboxCont>
          <input 
            type='checkbox' 
            onChange={handleChange}
            checked={isSelected}
          />
        </CheckboxCont>
      </CondDisplay>
      <ImgCont>
        <Link to={`/item/${item._id}`}>
          <Img src={item.images[item.primaryImageIndex]} />
        </Link>
      </ImgCont>
      <InfoCont>
        <ItemInfo cartObj={cartObj} />
      </InfoCont>
      
    </Container>
  )
};

export default ListElt;
