import React from 'react';
import styled from 'styled-components';
import Notification from 'src/components/common/Notification';
import log from 'src/util/log';

const Container = styled.div`
  width: 15rem;
  height: 15rem;
  margin: .5rem;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  border: ${(props) => (props.isPrimary ? `2px solid ${props.theme.green}` : '')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgCont = styled.div`
  border-radius: 10px;
  width: 14.5rem;
  height: 14.5rem;
  position: relative;
`;

const Img = styled.img`
  position: absolute;
  margin: auto; 
  height: 100%;
  width: 100%;
`;

const ListElt = ({ src, i, formik }) => {
  const isPrimary = formik.values.primaryImageIndex === i;
  const handleDelete = () => {
    if (isPrimary && i !== 0) {
      // SET NEW INDEX
      formik.setFieldValue('primaryImageIndex', i - 1);
    }
    const newImages = formik.values.images;
    newImages.splice(i, 1);
    formik.setFieldValue('images', newImages);
  };
  const changePrimary = () => {
    log('changePrimary');
    formik.setFieldValue('primaryImageIndex', i);
  };
  return (
    <Container isPrimary={isPrimary}>
      <ImgCont onClick={changePrimary}>
        <Img src={src} />
      </ImgCont>
      <Notification
        text="x"
        onClick={handleDelete}
      />
    </Container>
  );
};

export default ListElt;
