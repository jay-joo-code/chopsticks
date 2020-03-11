import React from 'react';
import styled from 'styled-components';
import ErrMsg from 'src/components/common/form/ErrMsg';
import Label from 'src/components/common/fonts/Label';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`

`

const Input = styled.input`
  margin: 0 !important;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: .5rem 0;
`

const RadioLabel = styled(Body)`
  margin: 0 0 0 .5rem;
`

const SideText = styled(Body)`
  margin: 0 0 0 2rem;
`

const Checkbox = ({ formik, name, opts, label, ...rest }) => {
  const hasError = formik ? formik.touched[name] && formik.errors[name] : false;
  // const formikProps = formik ? formik.getFieldProps(name) : [];
  
  const handleChange = (value) => {
    formik.setFieldValue(name, value);
  }

  return (
    <Container>
      <Label>{label}</Label>
      {opts.map((opt) => (
        <Row>
          <Input
            type='radio'
            value={opt.value}
            checked={formik.values[name] === opt.value}
            onChange={() => handleChange(opt.value)}
          />
          <RadioLabel>{opt.label}</RadioLabel>
          <SideText muted>{opt.sideLabel}</SideText>
        </Row>
      ))}
      {hasError
        ? <ErrMsg>{formik.errors[name]}</ErrMsg>
        : null}
    </Container>
  );
};

export default Checkbox;
