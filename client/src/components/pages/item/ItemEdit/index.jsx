import React from 'react';
import styled from 'styled-components';
import useCurrentItem from 'src/util/hooks/useCurrentItem';
import RedButton from 'src/components/common/buttons/RedButton';

import SectOne from './SectOne';
import SectTwo from './SectTwo';
import SectThree from './SectThree';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const Container = styled.div`

`;

const Form = styled.form`

`

const Title = styled.h2`
  color: ${props => props.theme.green};
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  margin: 4rem 0;
`

const ItemEdit = () => {
  const item = useCurrentItem();
  const formik = useFormik({
    initialValues: {
      name: item.name,
      category: item.category,
      contents: item.contents,
      price: item.price,
      stock: item.stock,
      madeOnOrder: item.madeOnOrder,
      options: item.options,
      processingMin: item.processingMin,
      processingMax: item.processingMax,
      deliveryMin: item.deliveryMin,
      deliverymax: item.deliverymax,
      deliveryCost: item.deliveryCost,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(16, '최대 16자')
        .required('필수'),
      email: Yup.string()
        .email('이메일 형식 오류')
        .required('필수'),
      mobile: Yup.number()
        .typeError('숫자만 기입해주세요')
        .required('필수'),
      intro: Yup.string()
        .required('필수'),
    }),
    onSubmit: (values, { setFieldError }) => {
      
    }
  });
  
  return (
    <Container>
        <div class="add_item">
            <Title>상품 등록</Title>
            <Form onSubmit={formik.handleSubmit}>
              <SectOne formik={formik} />
              <SectTwo formik={formik} />
              <SectThree formik={formik} />
                
                    
                
                
                
              <RedButton type='submit'>저장</RedButton>
            </Form>
        </div>
    </Container>
  )
};

export default ItemEdit;
