import React from 'react';
import styled from 'styled-components';
import Title from 'src/components/common/fonts/Title';
import p1 from 'src/assets/images/policies/service/서비스 이용약관_0001.png';
import p2 from 'src/assets/images/policies/service/서비스 이용약관_0002.png';
import p3 from 'src/assets/images/policies/service/서비스 이용약관_0003.png';
import p4 from 'src/assets/images/policies/service/서비스 이용약관_0004.png';
import p5 from 'src/assets/images/policies/service/서비스 이용약관_0005.png';
import p6 from 'src/assets/images/policies/service/서비스 이용약관_0006.png';
import p7 from 'src/assets/images/policies/service/서비스 이용약관_0007.png';
import p8 from 'src/assets/images/policies/service/서비스 이용약관_0008.png';
import p9 from 'src/assets/images/policies/service/서비스 이용약관_0009.png';
import p10 from 'src/assets/images/policies/service/서비스 이용약관_0010.png';
import p11 from 'src/assets/images/policies/service/서비스 이용약관_0011.png';
import p12 from 'src/assets/images/policies/service/서비스 이용약관_0012.png';
import p13 from 'src/assets/images/policies/service/서비스 이용약관_0013.png';
import p14 from 'src/assets/images/policies/service/서비스 이용약관_0014.png';
import p15 from 'src/assets/images/policies/service/서비스 이용약관_0015.png';
import p16 from 'src/assets/images/policies/service/서비스 이용약관_0016.png';
import p17 from 'src/assets/images/policies/service/서비스 이용약관_0017.png';
import p18 from 'src/assets/images/policies/service/서비스 이용약관_0018.png';
import p19 from 'src/assets/images/policies/service/서비스 이용약관_0019.png';
import p20 from 'src/assets/images/policies/service/서비스 이용약관_0020.png';
import p21 from 'src/assets/images/policies/service/서비스 이용약관_0021.png';
import p22 from 'src/assets/images/policies/service/서비스 이용약관_0022.png';
import p23 from 'src/assets/images/policies/service/서비스 이용약관_0023.png';
import p24 from 'src/assets/images/policies/service/서비스 이용약관_0024.png';
import p25 from 'src/assets/images/policies/service/서비스 이용약관_0025.png';
import p26 from 'src/assets/images/policies/service/서비스 이용약관_0026.png';
import p27 from 'src/assets/images/policies/service/서비스 이용약관_0027.png';
import p28 from 'src/assets/images/policies/service/서비스 이용약관_0028.png';
import p29 from 'src/assets/images/policies/service/서비스 이용약관_0029.png';
import p30 from 'src/assets/images/policies/service/서비스 이용약관_0030.png';
import p31 from 'src/assets/images/policies/service/서비스 이용약관_0031.png';
import p32 from 'src/assets/images/policies/service/서비스 이용약관_0032.png';
import p33 from 'src/assets/images/policies/service/서비스 이용약관_0033.png';
import p34 from 'src/assets/images/policies/service/서비스 이용약관_0034.png';
import p35 from 'src/assets/images/policies/service/서비스 이용약관_0035.png';
import p36 from 'src/assets/images/policies/service/서비스 이용약관_0036.png';
import p37 from 'src/assets/images/policies/service/서비스 이용약관_0037.png';
import p38 from 'src/assets/images/policies/service/서비스 이용약관_0038.png';
import p39 from 'src/assets/images/policies/service/서비스 이용약관_0039.png';
import p40 from 'src/assets/images/policies/service/서비스 이용약관_0040.png';
import p41 from 'src/assets/images/policies/service/서비스 이용약관_0041.png';
import p42 from 'src/assets/images/policies/service/서비스 이용약관_0042.png';
import p43 from 'src/assets/images/policies/service/서비스 이용약관_0043.png';
import p44 from 'src/assets/images/policies/service/서비스 이용약관_0044.png';
import p45 from 'src/assets/images/policies/service/서비스 이용약관_0045.png';

const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  margin: 2rem 0;
`

const TermsOfUse = () => {
  const files = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30, p31, p32, p33, p34, p35, p36, p37, p38, p39, p40, p41, p42, p43, p44, p45]
  return (
  <Container>
    <Title>이용약관</Title>
    {files.map((file) => <Img src={file} />)}
  </Container>
  )
};

export default TermsOfUse;
