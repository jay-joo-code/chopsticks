import React, { useState } from 'react';
import styled from 'styled-components';
import RedButton from 'src/components/common/buttons/RedButton';
import log from 'src/util/log';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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

const ItemEdit = ({ item }) => {
  const history = useHistory();
  const [options, setOptions] = useState(item.options || []);
  const formik = useFormik({
    initialValues: {
      name: item.name,
      category: item.category,
      content: item.content,
      price: item.price,
      stock: item.stock,
      madeOnOrder: item.madeOnOrder,
      processingMin: item.processingMin,
      processingMax: item.processingMax,
      deliveryMin: item.deliveryMin,
      deliveryMax: item.deliveryMax,
      deliveryCost: item.deliveryCost,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('필수'),
      content: Yup.string()
        .required('필수'),
      price: Yup.number()
        .typeError('숫자만 기입해주세요')
        .required('필수'),
      stock: Yup.number()
        .typeError('숫자만 기입해주세요')
        .required('필수'),
      processingMin: Yup.number()
        .typeError('숫자만 기입해주세요')
        .required('필수'),
      processingMax: Yup.number()
        .typeError('숫자만 기입해주세요')
        .required('필수'),
      deliveryMin: Yup.number()
        .typeError('숫자만 기입해주세요')
        .required('필수'),
      deliveryMax: Yup.number()
        .typeError('숫자만 기입해주세요')
        .required('필수'),
      deliveryCost: Yup.number()
        .typeError('숫자만 기입해주세요')
        .required('필수'),
    }),
    onSubmit: (values, { setFieldError }) => {
      axios.put(`/api/item/${item._id}/update`, values)
        .then(() => {
          history.push(`/item/${item._id}`);
        })
        .catch((e) => {
          log(`ERROR update item`)
        })
    }
  });
  
  if (item === {}) return <div />;
  
  return (
    <Container>
        
            <Title>상품 등록</Title>
            <Form onSubmit={formik.handleSubmit}>
              <SectOne formik={formik} />
              <SectTwo 
                formik={formik} 
                options={options}
                setOptions={setOptions}
              />
              <SectThree formik={formik} />
              <RedButton type='submit'>저장</RedButton>
            </Form>
        
    </Container>
  )
};

export default ItemEdit;
