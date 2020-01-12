import React, { useState } from 'react';
import styled from 'styled-components';
import uploadFile from 'src/firebase/uploadFile';
import log from 'src/util/log';
import axios from 'axios';
import Loading from 'src/components/common/Loading';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const FileUpload = ({ path, setSrc }) => {
  const [loading, setLoading] = useState(false);
  const handleUpload = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    uploadFile(file, path)
      .then((url) => {
        setLoading(false);
        setSrc(url);
      })
      .catch((e) => {
        setLoading(false);
        log('ERROR upload file');
      });
  };
  return (
    <Container>
      <input
        type="file"
        onChange={handleUpload}
      />
      {loading
        ? <Loading />
        : <div />}
    </Container>
  );
};

export default FileUpload;
