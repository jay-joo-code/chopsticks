import React from 'react';
import styled from 'styled-components';
import ErrMsg from 'src/components/common/form/ErrMsg';
import Label from 'src/components/common/form/Label';
import SideText from 'src/components/common/form/SideText';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  height: 3rem;
  line-height: 3rem;
  padding: 0 .5rem 0 1rem;
  flex-grow: 2;
  border: ${(props) => (props.hasError ? 'solid 1px #de6362' : 'none')};
  text-align: ${(props) => (props.right ? 'right' : '')};
`;

const ButtonContainer = styled.div`
  margin-left: 1rem;
`;

const OutlinedInput = (props) => {
  const {
    formik, name, label, sideButton, type, sideText,
  } = props;
  const hasError = formik ? formik.touched[name] && formik.errors[name] : false;
  const formikProps = formik ? formik.getFieldProps(name) : [];

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <InputArea>
        <Input
          type={type || 'text'}
          {...props}
          {...formikProps}
          hasError={hasError}
        />
        {sideText && (
          <SideText>
            {sideText}
          </SideText>
        )}
        {sideButton && (
          <ButtonContainer>
            {sideButton}
          </ButtonContainer>
        )}
      </InputArea>
      {hasError
        ? <ErrMsg>{formik.errors[name]}</ErrMsg>
        : null}
    </Container>
  );
};

export default OutlinedInput;
