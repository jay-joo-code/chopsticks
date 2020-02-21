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

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  border: ${(props) => (props.hasError ? 'solid 1px #de6362' : 'none')};
`;

const ButtonContainer = styled.div`
  margin-left: 1rem;
`;

const ErrorMsg = styled.div`
  font-size: .8rem;
  color: #de6362;
`;

const OutlinedTextarea = ({
  formik, name, label, sideButton, value, setValue, ...rest
}) => {
  // non formik props
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const nonFormikProps = {
    value,
    onChange: handleChange,
  };
  let dynProps = nonFormikProps;

  // formik props
  let hasError;
  if (formik) {
    hasError = formik.touched[name] && formik.errors[name];
    const formikProps = {
      ...formik.getFieldProps(name),
      hasError,
    };
    dynProps = formikProps;
  }

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <InputArea>
        <Textarea
          type="text"
          {...rest}
          {...dynProps}
        />
        {sideButton && (
          <ButtonContainer>
            {sideButton}
          </ButtonContainer>
        )}
      </InputArea>
      {formik && hasError
        ? <ErrorMsg>{formik.errors[name]}</ErrorMsg>
        : null}
    </Container>
  );
};

export default OutlinedTextarea;
