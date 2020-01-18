import React from 'react';
import styled from 'styled-components';
import selectIcon from 'src/assets/images/ui/select.png';
import ErrMsg from 'src/components/common/form/ErrMsg';
import Label from 'src/components/common/form/Label';

const Container = styled.div`

`;

const StyledSelect = styled.select`
  display: block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(${selectIcon}) no-repeat 93% 50%;
  border-radius: 8px;
  border-color: ${(props) => (props.hasError ? props.theme.red : '')};
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  padding: .6rem 3rem .6rem 1rem;
  cursor: pointer;
`;

const Select = ({
  formik, name, children, label, ...rest
}) => {
  const hasError = formik ? formik.touched[name] && formik.errors[name] : false;
  const formikProps = formik ? formik.getFieldProps(name) : [];

  return (
    <Container>
      {label && (<Label htmlFor={name}>{label}</Label>)}
      <StyledSelect
        name={name}
        hasError={hasError}
        {...formikProps}
        {...rest}
      >
        {children}
      </StyledSelect>
      {formik && hasError
        ? <ErrMsg>{formik.errors[name]}</ErrMsg>
        : null}
    </Container>
  );
};

export default Select;
