import React, { useState } from 'react';
import styled from 'styled-components';
import RedButton from 'src/components/common/buttons/RedButton';
import api from 'src/util/api';
import { ReactComponent as Trash } from 'src/assets/svgs/trash.svg';
import { ReactComponent as Copy } from 'src/assets/svgs/duplicate.svg';
import Popup from 'src/components/common/popups/Popup';
import Title from 'src/components/common/fonts/Title';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .5rem;
`;

const DispBtnSection = styled.div`
  display: flex;
  border: 1px solid rgba(0, 0, 0, .2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .4);
`

const DispBtn = styled.div`
  font-size: .8rem;
  padding: .3rem 1rem;
  cursor: pointer;
  
  // highlight
  background: ${props => props.highlight ? props.theme.primary : ''};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const STrash = styled(Trash)`
  height: 1.2rem;
  width: 1.2rem;
  opacity: .6;
  cursor: pointer;
  margin-left: .5rem;
`;

const SCopy = styled(Copy)`
  height: 1rem;
  width: 1rem;
  opacity: .6;
  cursor: pointer;
`;

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const STitle = styled(Title)`
  margin: 1rem 0;
`;

const BtnContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const BtnWrapper = styled.div`
  margin: 0 .5rem;
`;

const Tools = ({ item, v, setV, hasMaxDisplayed }) => {
  // display
  const setDisplay = (newState) => {
    const updatedItem = {
      ...item,
    };
    updatedItem.display = newState;
    if (hasMaxDisplayed) updatedItem.display = false;
    api.put(`/item/${item._id}/update`, updatedItem)
      .then(() => setV(v + 1))
      .catch(() => setV(v + 1));
  };


  // duplicate
  const handleCopy = () => {
    const newItem = { ...item, _id: null };
    api.post('/item/create', newItem)
      .then(() => setV(v + 1))
      .catch(() => setV(v + 1));
  };

  // delete
  const [showPopup, setShowPopup] = useState(0);
  const handleDelete = () => {
    api.delete(`/item/${item._id}/delete`)
      .then(() => setV(v + 1))
      .catch(() => setV(v + 1));
  };
  const closePopup = () => setShowPopup(0);

  return (
    <Container>
      <DispBtnSection>
        <DispBtn highlight={item.display} onClick={() => setDisplay(true)}>판매중</DispBtn>
        <DispBtn highlight={!item.display} onClick={() => setDisplay(false)}>판매중지</DispBtn>
      </DispBtnSection>
      <RightSection>
        <SCopy onClick={handleCopy} />
        <STrash onClick={() => setShowPopup(1)} />
      </RightSection>
      <Popup
        display={showPopup}
        handleClosePopup={closePopup}
      >
        <PopupContainer>
          <STitle>상품 삭제</STitle>
          <Body>해당 데이터가 영구적으로 삭제됩니다</Body>
          <BtnContainer>
            <BtnWrapper>
              <RedButton white rounded onClick={closePopup}>취소</RedButton>
            </BtnWrapper>
            <BtnWrapper>
              <RedButton rounded onClick={handleDelete}>삭제</RedButton>
            </BtnWrapper>
          </BtnContainer>
        </PopupContainer>
      </Popup>
    </Container>
  );
};

export default Tools;
