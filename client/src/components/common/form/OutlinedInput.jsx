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
  font-size: 16px;
  height: 3rem;
  line-height: 3rem;
  padding: .5rem;
  flex-grow: 2;
  width: 100%;
  background: inherit;
  border-bottom: 2px solid rgba(0, 0, 0, .2);

  &:focus {
    border-bottom: 2px solid grey;
  }
  
  // align
  text-align: ${(props) => (props.right ? 'right' : '')};
  text-align: ${(props) => (props.center ? 'center' : '')};
  
  // hasError
  border-bottom: ${(props) => (props.hasError ? `solid 2px #de6362` : '')};
  
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
    formik, name, label, sideButton, type, sideText, disabled, grey, width, size, errMsg, ...rest
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
      {(hasError || errMsg) && <ErrMsg>{errMsg || formik.errors[name]}</ErrMsg>}
    </Container>
  );
};

export default OutlinedInput;
