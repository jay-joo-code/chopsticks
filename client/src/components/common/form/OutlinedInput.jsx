import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: .5rem;
`;

const InputArea = styled.div`
  display: flex;
`;

const Input = styled.input`
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  height: 3rem;
  line-height: 3rem;
  padding-left: 20px;
  flex-grow: 2;
  border: ${(props) => (props.hasError ? 'solid 1px #de6362' : 'none')};
`;

const ButtonContainer = styled.div`
  margin-left: 1rem;
`;

const ErrorMsg = styled.div`
  font-size: .8rem;
  color: #de6362;
  margin-top: .5rem;
`;

const FormikInput = (props) => {
  const {
    formik, name, label, sideButton, type,
  } = props;
  const hasError = formik.touched[name] && formik.errors[name];
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <InputArea>
        <Input
          type={type || 'text'}
          {...props}
          {...formik.getFieldProps(name)}
          hasError={hasError}
        />
        {sideButton && (
          <ButtonContainer>
            {sideButton}
          </ButtonContainer>
        )}
      </InputArea>
      {hasError
        ? <ErrorMsg>{formik.errors[name]}</ErrorMsg>
        : null}
    </Container>
  );
};

export default FormikInput;
