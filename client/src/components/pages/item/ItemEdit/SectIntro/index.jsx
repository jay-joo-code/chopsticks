import React from 'react';
import styled from 'styled-components';
import ErrMsg from 'src/components/common/form/ErrMsg';
import { Editor } from '@tinymce/tinymce-react';
import uploadFile from 'src/firebase/uploadFile';
import Label from 'src/components/common/form/Label';
import SectCont from '../SectCont';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectIntro = ({ formik, _id }) => {
  const handleEditorChange = (e) => {
    formik.setFieldValue('intro', e.target.getContent());
  };
  const handleEditorImageUpload = async (blobInfo, success, failure) => {
    const file = new File([blobInfo.blob()], blobInfo.filename());
    try {
      const src = await uploadFile(file, `item/${_id}`);
      success(src);
    } catch (e) {
      failure(e);
    }
  };
  const dynamicWidth = window.innerWidth < 620 ? window.innerWidth : 620;
  return (
    <SectCont>
      <Container>
        <Label>상품 스토리</Label>
        <p>* Heading 1 만 스타일이 적용 됩니다</p>
        <Editor
          apiKey="hx67eymwnlq0vtdniv7pbbnfdip57g2vcuqtwmqyugszg4f1"
          initialValue={formik.values.intro}
          init={{
            height: 700,
            width: dynamicWidth,
            menubar: false,
            plugins: [
              'advlist autolink lists link image',
              'charmap print preview anchor help',
              'searchreplace visualblocks code',
              'insertdatetime media table paste wordcount',
            ],
            toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist | image',
            images_upload_handler: handleEditorImageUpload,
          }}
          onChange={handleEditorChange}
        />
        {formik.errors.intro && formik.touched.intro && (
        <ErrMsg>{formik.errors.intro}</ErrMsg>
        )}
      </Container>
    </SectCont>
  );
};

export default SectIntro;
