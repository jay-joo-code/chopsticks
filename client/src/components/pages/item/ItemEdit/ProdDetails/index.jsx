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
  
  // styles
  const CONTENT_WIDTH = 620;
  const HORI_PADDING = 100;
  const isMinified = window.innerWidth < CONTENT_WIDTH;
  const dynamicWidth = isMinified ? window.innerWidth - 40 : CONTENT_WIDTH + HORI_PADDING * 2;
  const padding = isMinified ? '0' : '2rem 100px';
  const font = `
  h1 { font-size: 32px; margin: 0; } 
  h2 { font-size: 24px; margin: 0; }
  h3 { font-size: 19px; margin: 0; } 
  h4 { font-size: 16px; margin: 0; } 
  h5 { font-size: 13px; margin: 0; } 
  h6 { font-size: 10px; margin: 0; } 
  p { font-size: 16px; margin: 0; }`;
  const img = `img { width: ${CONTENT_WIDTH}px; object-fit: cover; height: auto; }`
  const style = `body { width: ${CONTENT_WIDTH}px; padding: ${padding}; margin: 0; opacity: .9; }` + img + font;
  
  
  // guidelines
  const guidelines = `
<div>
<p>* 상품의 가치를 스토리와 함께 표현해 보세요</p>
<p>&nbsp; 아래의 항목들은 상품에 맞게 배치 / 작성 하여도 좋습니다.</p>
<p>&nbsp;</p>
<h3>제품의 상세 소개 (제품의 제작 배경 및 스토리를 담아 제품 본연의 가치를 전달해주세요. )</h3>
<h3>&nbsp;</h3>
<h3>1. 제품 제작의 배경 및 스토리</h3>
<p>&nbsp;</p>
<h3>2. 제품 소개</h3>
<p>&nbsp;</p>
<h3>3. 제작 과정 &amp; 방법 (제작 방법과 제작 과정의 이미지를 함께 보여주시면 더 좋습니다)</h3>
<h3>&nbsp;</h3>
<h3>4. Notice &amp; FAQ</h3>
<h3>&nbsp;</h3>
<h3>5. 작가 / 디자이너 &amp; 브랜드 소개</h3>
<p>&nbsp;</p>
</div>`
  const initialValue = formik.values.intro || guidelines;
  
  return (
    <SectCont>
      <Container>
        <Label>상품 상세 소개</Label>
        <Body muted>*상품을 스토리와 함께 표현하여 상품 본연의 가치를 전달해 주세요.</Body>
        <Body muted>*이미지 넓이는 620px 를 권장합니다</Body>
        <EditorContainer>
          <Editor
            apiKey="hx67eymwnlq0vtdniv7pbbnfdip57g2vcuqtwmqyugszg4f1"
            initialValue={initialValue}
            init={{
              height: 1000,
              width: dynamicWidth,
              menubar: false,
              content_style: style,
              plugins: [
                'advlist autolink lists link image',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount',
                'importcss'
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
