import React from 'react';
import styled from 'styled-components';
import log from 'src/util/log';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormContents from './FormContents';

const Container = styled.div`
  padding: 3rem 0;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    padding: 3rem 7rem;
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.green};
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  margin: 4rem 0;
`;

const ItemEdit = ({ item }) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: item.name,
      category: item.category,
      subcat: item.subcat || '',
      style: item.style || '',
      image: item.image,
      content: item.content,
      intro: item.intro,
      price: item.price,
      stock: item.stock,
      optGrps: item.optGrps || [],
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
      image: Yup.string()
        .required('필수'),
      category: Yup.string()
        .required('필수'),
      subcat: Yup.string()
        .required('필수'),
      style: Yup.string()
        .required('필수'),
      intro: Yup.string()
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
      const mergedValues = {
        ...values,
        created: true,
      };
      axios.put(`/api/item/${item._id}/update`, mergedValues)
        .then(() => {
          history.push(`/item/${item._id}`);
        })
        .catch((e) => {
          log('ERROR update item');
        });
    },
  });

  if (item === {} || !formik) return <div />;

  return (
    <Container>
      <Title>상품 등록</Title>
      <FormContents
        formik={formik}
        _id={item._id}
      />
    </Container>
  );
};

export default ItemEdit;
