import React from 'react';
import styled from 'styled-components';
import selectIcon from 'src/assets/images/ui/select.png';
import ErrMsg from 'src/components/common/form/ErrMsg';
import Label from 'src/components/common/fonts/Label';

const Container = styled.div`

`;

const StyledSelect = styled.select`
  display: block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(${selectIcon}) no-repeat 93% 50%;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  padding: .3rem 2rem .3rem .5rem;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, .1);
  
  & > option {
    width: auto;
  }
  
  // hasError
  border-color: ${(props) => (props.hasError ? props.theme.red : '')};
  
  // width
  width: ${props => props.width ? `${props.width}px` : ''};
`;

const Select = ({
  formik, name, children, label, placeholder, width, ...rest
}) => {
  const hasError = formik ? formik.touched[name] && formik.errors[name] : false;
  const formikProps = formik ? formik.getFieldProps(name) : [];

  return (
    <Container>
      {label && (<Label htmlFor={name}>{label}</Label>)}
      <StyledSelect
        name={name}
        hasError={hasError}
        width={width}
        {...formikProps}
        {...rest}
      >
        <option value='' disabled>{placeholder || '선택'}</option>
        {children}
      </StyledSelect>
      {formik && hasError
        ? <ErrMsg>{formik.errors[name]}</ErrMsg>
        : null}
    </Container>
  );
};

export default Select;
