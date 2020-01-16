import React, { useState } from 'react';
import styled from 'styled-components';
import SectCont from './../SectCont';
import log from 'src/util/log';
import { Editor } from '@tinymce/tinymce-react'; 
import uploadFile from 'src/firebase/uploadFile';
import Label from 'src/components/common/form/Label';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectIntro = ({ formik, _id }) => {
  const handleEditorChange = (e) => {
    formik.setFieldValue('intro', e.target.getContent())
  }
  const handleEditorImageUpload = async (blobInfo, success, failure) => {
    var file = new File([blobInfo.blob()], blobInfo.filename());
    try {
      const src = await uploadFile(file, `item/${_id}`);
      success(src);
    } catch (e) {
      failure(e)
    }
  }
  return (
    <SectCont>
    <Container>
      <Label>상품 스토리</Label>
        <Editor
        apiKey="hx67eymwnlq0vtdniv7pbbnfdip57g2vcuqtwmqyugszg4f1"
        initialValue={formik.values.intro}
        init={{
          height: 700,
          width: 620,
          menubar: false,
          plugins: [
            'advlist autolink lists link image', 
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist | image',
          images_upload_handler: handleEditorImageUpload
        }}
        onChange={handleEditorChange}
      />
    </Container>
    </SectCont>
  )
};

export default SectIntro;
