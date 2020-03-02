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
  const handleEditorChange = (e) => {
    formik.setFieldValue('intro', e.target.getContent());
    console.log(e.target.getContent())
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
  const dynamicWidth = window.innerWidth < 620 ? window.innerWidth - 40 : 620;
  const guidelines = `<div class="textlayer" style="width: 1440px; height: 810px;">
<p style="left: 74.55000000000001px; top: 184.63432617187505px; font-size: 16.5px; font-family: sans-serif;">* 상품의 가치를 스토리와 함께 표현해 보세요</p>
<p style="left: 74.55000000000001px; top: 184.63432617187505px; font-size: 16.5px; font-family: sans-serif;">&nbsp; 아래의 항목들은 상품에 맞게 배치 / 작성 하여도 좋습니다.</p>
<p style="left: 74.55000000000001px; top: 184.63432617187505px; font-size: 16.5px; font-family: sans-serif;">&nbsp;</p>
<h1 style="left: 74.55000000000001px; top: 184.63432617187505px; font-size: 16.5px; font-family: sans-serif;">제품의 상세 소개 (제품의 제작 배경 및 스토리를 담아 제품 본연의 가치를 전달해주세요. )</h1>
<h1 style="left: 74.55000000000001px; top: 184.63432617187505px; font-size: 16.5px; font-family: sans-serif;">&nbsp;</h1>
<h1 style="left: 74.55000000000001px; top: 184.63432617187505px; font-size: 16.5px; font-family: sans-serif;">1. 제품 제작의 배경 및 스토리</h1>
<p>&nbsp;</p>
<h1 style="left: 74.55000000000001px; top: 184.63432617187505px; font-size: 16.5px; font-family: sans-serif;">2. 제품 소개</h1>
<p>&nbsp;</p>
<h1 style="left: 74.55000000000001px; top: 184.63432617187505px; font-size: 16.5px; font-family: sans-serif;">3. 제작 과정 &amp; 방법 (제작 방법과 제작 과정의 이미지를 함께 보여주시면 더 좋습니다)</h1>
<h1 style="left: 74.55000000000001px; top: 184.63432617187505px; font-size: 16.5px; font-family: sans-serif;">&nbsp;</h1>
<h1 style="left: 74.55000000000001px; top: 184.63432617187505px; font-size: 16.5px; font-family: sans-serif;">4. Notice &amp; FAQ</h1>
<h1 style="left: 74.55000000000001px; top: 184.63432617187505px; font-size: 16.5px; font-family: sans-serif;">&nbsp;</h1>
<h1 style="left: 74.55000000000001px; top: 184.63432617187505px; font-size: 16.5px; font-family: sans-serif;">5. 작가 / 디자이너 &amp; 브랜드 소개</h1>
<p>&nbsp;</p>
</div>`
  const initialValue = formik.values.intro || guidelines;
  
  return (
    <SectCont>
      <Container>
        <Label>상품 상세 소개</Label>
        <Body>* Heading 1 만 스타일이 적용 됩니다</Body>
        <EditorContainer>
          <Editor
            apiKey="hx67eymwnlq0vtdniv7pbbnfdip57g2vcuqtwmqyugszg4f1"
            initialValue={initialValue}
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
