import React from 'react';
import styled from 'styled-components';
import Title from 'src/components/common/fonts/Title';
import p1 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-01.png';
import p2 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-02.png';
import p3 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-03.png';
import p4 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-04.png';
import p5 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-05.png';
import p6 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-06.png';
import p7 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-07.png';
import p8 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-08.png';
import p9 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-09.png';
import p10 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-10.png';
import p11 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-11.png';
import p12 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-12.png';
import p13 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-13.png';
import p14 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-14.png';
import p15 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-15.png';
import p16 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-16.png';
import p17 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-17.png';
import p18 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-18.png';
import p19 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-19.png';
import p20 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-20.png';
import p21 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-21.png';
import p22 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-22.png';
import p23 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-23.png';
import p24 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-24.png';
import p25 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-25.png';
import p26 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-26.png';
import p27 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-27.png';
import p28 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-28.png';
import p29 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-29.png';
import p30 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-30.png';
import p31 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-31.png';
import p32 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-32.png';
import p33 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-33.png';
import p34 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-34.png';
import p35 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-35.png';
import p36 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-36.png';
import p37 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-37.png';
import p38 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-38.png';
import p39 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-39.png';
import p40 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-40.png';
import p41 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-41.png';
import p42 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-42.png';
import p43 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-43.png';
import p44 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-44.png';
import p45 from 'src/assets/images/policies/service/ezgif-5-ad4a4ac63d.pdf-45.png';

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
