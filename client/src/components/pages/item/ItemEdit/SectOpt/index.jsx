import React from 'react';
import Label from 'src/components/common/form/Label';
import SectCont from '../SectCont';
import Options from './Options';

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
