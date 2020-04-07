import React from 'react';
import styled from 'styled-components';
import ErrMsg from 'src/components/common/form/ErrMsg';
import Label from 'src/components/common/fonts/Label';
import SideText from 'src/components/common/form/SideText';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: inherit;
  
  // width
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  height: 3rem;
  line-height: 3rem;
  padding: .5rem;
  flex-grow: 2;
  border: ${(props) => (props.hasError ? 'solid 1px #de6362' : 'none')};
  text-align: ${(props) => (props.right ? 'right' : '')};
  width: 100%;
  background: white !;
  //background: ${props => props.grey ? 'rgba(0, 0, 0, .1)' : ''};
  border: 1px solid rgba(0, 0, 0, .2);
  
  // sideButton
  flex-shrink: ${props => props.sideButton ? '2' : ''};
  width: ${props => props.sideButton ? 'auto' : ''};
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  margin-left: 1rem;
  flex-grow: 5;
`;

const OutlinedInput = ({
    formik, name, label, sideButton, type, sideText, disabled, grey, width, size, ...rest
  }) => {
  const hasError = formik ? formik.touched[name] && formik.errors[name] : false;
  const formikProps = formik ? formik.getFieldProps(name) : [];

  return (
    <Container {...rest} width={width}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <InputArea>
        <Input
          type={type || 'text'}
          {...formikProps}
          disabled={disabled}
          grey={grey}
          hasError={hasError}
          {...rest}
          sideButton={sideButton}
          size={size}
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
