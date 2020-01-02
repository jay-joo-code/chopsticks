import React, { useState } from 'react';
import styled from 'styled-components';
import uploadFile from 'src/firebase/uploadFile';
import log from 'src/util/log';
import axios from 'axios';
import Loading from 'src/components/common/Loading';

const Container = styled.div`

`;

const UploadGroup = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const Input = styled.input`
  font-size: 1rem;
  font-family: inherit;
  margin: .2rem 0;
`;

const UploadSection = (props) => {
  const { itemId, images, version, setVersion } = props;
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    uploadFile(file, `/items/${itemId}`)
      .then((url) => {
        // UPDATE DB
        let newImages = [...images];
        newImages.push(url);
        axios.put(`/api/item/${itemId}/update`, { images: newImages })
          .then((res) => {
            setVersion(version + 1);
            setLoading(false);
          })
      })
      .catch((e) => {
        setLoading(false);
        log('ERROR upload', e);
      })
  };
  
  return (
    <Container>
      <UploadGroup>
        <Input type="file" onChange={handleFileChange} />
        {loading
          ? <Loading />
          : <div />
        }
      </UploadGroup>
    </Container>
    )
};

export default UploadSection;
