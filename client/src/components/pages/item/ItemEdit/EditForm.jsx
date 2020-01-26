import React, { useState, useEffect } from 'react';
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
import SectIntro from './SectIntro';
import ErrMsg from 'src/components/common/form/ErrMsg';

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
      style: item.style,
      images: item.images,
      primaryImageIndex: item.primaryImageIndex,
      content: item.content,
      intro: item.intro,
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
      style: Yup.string()
        .required('필수'),
      content: Yup.string()
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
        display: true,
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
  
  const [hasErrors, setHasErrors] = useState(false);
  useEffect(() => {
    setHasErrors(Object.keys(formik.errors).length > 0)
  }, [formik.errors])

  if (item === {} || !formik) return <div />;

  return (
    <Container>
      <Title>상품 등록</Title>
      <Form onSubmit={formik.handleSubmit}>
        <SectOne formik={formik} />
        <SectIntro formik={formik} _id={item._id} />
        <SectImg formik={formik} _id={item._id} />
        <SectOpt formik={formik} />
        <SectThree formik={formik} />
        <BtnCont>
          <RedButton type="submit">저장</RedButton>
          {hasErrors && (
            <ErrMsg>에러가 있습니다</ErrMsg> 
          )}
        </BtnCont>
      </Form>
    </Container>
  );
};

export default ItemEdit;
