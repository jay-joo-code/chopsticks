import React from 'react';
import styled from 'styled-components';
import selectIcon from 'src/assets/images/ui/select.png';
import ErrMsg from 'src/components/common/form/ErrMsg';
import Label from 'src/components/common/fonts/Label';

const Container = styled.div`
  position: relative;
  height: 2rem;
`;

const StyledSelect = styled.select`
  display: block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, .1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);

  background: url(${selectIcon}) no-repeat 93% 50%;
  padding: .3rem 2rem .3rem .5rem;
  height: 100%;

  cursor: pointer;
  
  & > option {
    width: auto;
  }
  
  // hasError
  border-color: ${(props) => (props.hasError ? props.theme.red : '')};
  
  // width
  width: ${props => props.width ? `${props.width}px` : ''};
  width: ${props => props.width === '100%' ? `100%` : ''};
`;

const HelperTextContainer = styled.div`
  position: absolute;
  right: 2rem;
  margin: auto 0;
  top: 0;
  bottom: 0;
  height: 100%;

  display: flex;
  align-items: center;
`

const HelperText = styled.p`
  opacity: .7;
`

const Select = ({
  formik, name, children, label, placeholder, width, helperText, ...rest
}) => {
  const hasError = formik ? formik.touched[name] && formik.errors[name] : false;
  const formikProps = formik ? formik.getFieldProps(name) : [];
  
  return (
    <Container>
      {helperText && (
        <HelperTextContainer>
          <HelperText>{helperText}</HelperText>
        </HelperTextContainer>
      )}
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
        : null
      }
    </Container>
  );
};

export default Select;
