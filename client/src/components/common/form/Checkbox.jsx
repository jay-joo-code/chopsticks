import React from 'react';
import styled from 'styled-components';
import ErrMsg from 'src/components/common/form/ErrMsg';
import Label from 'src/components/common/form/Label';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled(Label)`
  margin: 4px 0 0 .5rem;
`;

const Input = styled.input`
 margin: 0;
`;

const ButtonContainer = styled.div`
  margin-left: 1rem;
`;

const Checkbox = (props) => {
  const {
    formik, name, label, sideButton,
  } = props;
  const hasError = formik ? formik.touched[name] && formik.errors[name] : false;
  const formikProps = formik ? formik.getFieldProps(name) : [];

  return (
    <Container>
      <InputArea>
        <Input
          type="checkbox"
          checked={formik.values[name]}
          {...props}
          {...formikProps}
          hasError={hasError}
        />
        <CheckboxLabel htmlFor={name}>{label}</CheckboxLabel>
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

export default Checkbox;
