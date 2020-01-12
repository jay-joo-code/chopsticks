import React from 'react';
import SectCont from '../SectCont';
import Options from './Options'
import Label from 'src/components/common/form/Label';

const SectTwo = ({ formik }) => (
  <SectCont>
    <Label>옵션</Label>
    <Options
      formik={formik}
      name="options"
    />
    <Options
      formik={formik}
      name="optionsTwo"
    />
  </SectCont>
);

export default SectTwo;
