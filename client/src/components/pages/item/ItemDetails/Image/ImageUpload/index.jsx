import React from 'react';
import styled from 'styled-components';
import Popup from 'src/components/common/popup/Popup';
import UploadSection from './UploadSection';
import ImageList from './ImageList';

const Container = styled.div`

`;

const ImageUpload = (props) => {
  
  return (
    <Popup display={props.display} handleClosePopup={props.handleClosePopup}>
      <Container>
        <UploadSection {...props}/>
        <ImageList {...props} />
      </Container>
    </Popup>
  )
};

export default ImageUpload;
