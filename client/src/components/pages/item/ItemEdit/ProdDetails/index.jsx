import React from 'react';
import styled from 'styled-components';
import ErrMsg from 'src/components/common/form/ErrMsg';
import { Editor } from '@tinymce/tinymce-react';
import uploadFile from 'src/firebase/uploadFile';
import Label from 'src/components/common/fonts/Label';
import Body from 'src/components/common/fonts/Body';
import SectCont from '../SectCont';

const Container = styled.div`
  
`;

const EditorContainer = styled.div`
  margin: 1rem 0;
`

const SectIntro = ({ formik, _id }) => {
  // handlers
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
  
  // constants
  const isMinified = window.innerWidth < 620;
  const dynamicWidth = isMinified ? window.innerWidth - 40 : 820;
  const padding = isMinified ? '0' : '2rem 100px';
  const font = 'h1 { font-size: 32px; margin: 0; } h2 { font-size: 24px; margin: 0; } h3 { font-size: 19px; margin: 0; } h4 { font-size: 16px; margin: 0; } h5 { font-size: 13px; margin: 0; } h6 { font-size: 10px; margin: 0; } p { font-size: 16px; margin: 0; }';
  
  // guidelines
  const guidelines = `<div>
<p>* 상품의 가치를 스토리와 함께 표현해 보세요</p>
<p>&nbsp; 아래의 항목들은 상품에 맞게 배치 / 작성 하여도 좋습니다.</p>
<p>&nbsp;</p>
<h1>제품의 상세 소개 (제품의 제작 배경 및 스토리를 담아 제품 본연의 가치를 전달해주세요. )</h1>
<h1>&nbsp;</h1>
<h1>1. 제품 제작의 배경 및 스토리</h1>
<p>&nbsp;</p>
<h1>2. 제품 소개</h1>
<p>&nbsp;</p>
<h1>3. 제작 과정 &amp; 방법 (제작 방법과 제작 과정의 이미지를 함께 보여주시면 더 좋습니다)</h1>
<h1>&nbsp;</h1>
<h1>4. Notice &amp; FAQ</h1>
<h1>&nbsp;</h1>
<h1>5. 작가 / 디자이너 &amp; 브랜드 소개</h1>
<p>&nbsp;</p>
</div>`
  const initialValue = formik.values.intro || guidelines;
  
  return (
    <SectCont>
      <Container>
        <Label>상품 상세 소개</Label>
        <Body>* 이미지 넓이는 620px 를 권장합니다</Body>
        <EditorContainer>
          <Editor
            apiKey="hx67eymwnlq0vtdniv7pbbnfdip57g2vcuqtwmqyugszg4f1"
            initialValue={initialValue}
            init={{
              height: 1000,
              width: dynamicWidth,
              menubar: false,
              content_style: `body { padding: ${padding}; margin: 0; opacity: .9; } img { width: 620px; object-fit: cover; }` + font,
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
              file_picker_types: 'image',
            }}
            onChange={handleEditorChange}
          />
          {formik.errors.intro && formik.touched.intro && (
          <ErrMsg>{formik.errors.intro}</ErrMsg>
          )}
        </EditorContainer>
      </Container>
    </SectCont>
  );
};

export default SectIntro;