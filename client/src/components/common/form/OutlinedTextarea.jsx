import React from 'react';
import styled from 'styled-components';
import Body from 'src/components/common/fonts/Body';
import Label from 'src/components/common/fonts/Label';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Guideline = styled(Body)`
  margin: 0 0 1rem 0;
`

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
  line-height: 1.2;
  
  // height
  height: ${props => props.height ? `${props.height}px` : ''};
`;

const ButtonContainer = styled.div`
  margin-left: 1rem;
`;

const ErrorMsg = styled.div`
  font-size: .8rem;
  color: #de6362;
`;

const OutlinedTextarea = ({
  formik, name, label, sideButton, value, setValue, guideline, height, ...rest
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
      <Guideline muted>{guideline}</Guideline>
      <InputArea>
        <Textarea
          type="text"
          {...rest}
          {...dynProps}
          height={height}
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
