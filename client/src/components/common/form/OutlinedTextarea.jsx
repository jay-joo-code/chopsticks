import React from 'react';
import styled from 'styled-components';
import Body from 'src/components/common/fonts/Body';
import Label from 'src/components/common/fonts/Label';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Guideline = styled(Body)`
  margin: 0 0 1rem 0;
`

const InputArea = styled.div`
  display: flex;
  width: 100%;
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
  border: 1px solid rgba(0, 0, 0, .2);
  
  // height
  height: ${props => props.height ? `${props.height}px` : ''};
`;

const ButtonContainer = styled.div`
  margin-left: 1rem;
`;

const ErrorMsg = styled.div`
  font-size: .8rem;
  color: #de6362;
  margin: .5rem 0 0 .5rem;
`;

const CharCounter = styled.div`
  margin: .5rem 0 0 .5rem;
`

const CounterText = styled(Body)`
  // danger
  color: ${props => props.danger ? props.theme.danger : ''};
`

const OutlinedTextarea = ({
  formik, name, label, sideButton, value, setValue, guideline, height, charCounter, maxChar, ...rest
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
  
  // value based on "value" or "formik" props
  const dynValue = formik ? formik.values[name] : value;

  return (
    <Container>
      {label && <Label htmlFor={name}>{label}</Label>}
      {guideline && <Guideline muted>{guideline}</Guideline>}
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
      {charCounter && (
        <CharCounter>
          <CounterText danger={dynValue.length > maxChar}>{dynValue.length} / {maxChar}</CounterText>
        </CharCounter>
      )}
    </Container>
  );
};

export default OutlinedTextarea;
