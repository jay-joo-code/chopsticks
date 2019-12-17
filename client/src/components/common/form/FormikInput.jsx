import React from 'react';
import styled from 'styled-components';
import Input from './Input';

const Container = styled.div`
  
`;

const ErrorMsg = styled.div`
  font-size: .7em;
  font-family: inherit;
  color: ${(props) => props.theme.red};
`;

const FormikInput = (props) => {
  const { formik, name, label } = props;
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <Input {...props} {...formik.getFieldProps(name)} />
      {formik.touched[name] && formik.errors[name]
        ? <ErrorMsg>{formik.errors[name]}</ErrorMsg>
        : null}
    </Container>
  );
};

export default FormikInput;
