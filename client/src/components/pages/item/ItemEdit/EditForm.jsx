import React from 'react';
import styled from 'styled-components';
import RedButton from 'src/components/common/buttons/RedButton';
import log from 'src/util/log';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import SectOne from './SectOne';
import SectOpt from './SectOpt';
import SectThree from './SectThree';
import SectImg from './SectImg';


const Container = styled.div`
  padding: 3rem 0;
`;

const Form = styled.form`

`;

const Title = styled.h2`
  color: ${(props) => props.theme.green};
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  margin: 4rem 0;
`;

const BtnCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItemEdit = ({ item }) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: item.name,
      category: item.category,
      images: item.images,
      primaryImageIndex: item.primaryImageIndex,
      content: item.content,
      price: item.price,
      stock: item.stock,
      options: item.options,
      optionsTwo: item.optionsTwo,
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
      images: Yup.array()
        .of(Yup.string())
        .max(8, '최대 8장')
        .required('최소 1장 필수'),
      category: Yup.string()
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
          log('ERROR update item');
        });
    },
  });

  if (item === {} || !formik) return <div />;

  return (
    <Container>
      <Title>상품 등록</Title>
      <Form onSubmit={formik.handleSubmit}>
        <SectOne formik={formik} />
        <SectImg formik={formik} />
        <SectOpt formik={formik} />
        <SectThree formik={formik} />
        <BtnCont>
          <RedButton type="submit">저장</RedButton>
        </BtnCont>
      </Form>
    </Container>
  );
};

export default ItemEdit;