import React from 'react';
import styled from 'styled-components';
import ErrMsg from 'src/components/common/form/ErrMsg';
import Label from 'src/components/common/fonts/Label';
import SideText from 'src/components/common/form/SideText';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  width: ${props => props.width ? `${props.width}px` : ''};
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  border-radius: 8px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  height: 3rem;
  line-height: 3rem;
  padding: 0 .5rem 0 1rem;
  flex-grow: 2;
  border: ${(props) => (props.hasError ? 'solid 1px #de6362' : 'none')};
  text-align: ${(props) => (props.right ? 'right' : '')};
  width: 100%;
  background: ${props => props.grey ? 'rgba(0, 0, 0, .1)' : ''};
`;

const ButtonContainer = styled.div`
  margin-left: 1rem;
`;

const OutlinedInput = ({
    formik, name, label, sideButton, type, sideText, disabled, grey, width, ...rest
  }) => {
  const hasError = formik ? formik.touched[name] && formik.errors[name] : false;
  const formikProps = formik ? formik.getFieldProps(name) : [];

  return (
    <Container {...rest} width={width}>
      <Label htmlFor={name}>{label}</Label>
      <InputArea>
        <Input
          type={type || 'text'}
          {...formikProps}
          disabled={disabled}
          grey={grey}
          hasError={hasError}
          {...rest}
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
