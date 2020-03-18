import * as Yup from 'yup';

const firstThree = ['010', '011', '016', '017', '018', '019'];

const schema = Yup.string()
  .min(10, '최소 10자')
  .max(11, '최대 11자')
  .matches(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g, '형식이 틀립니다')
  .test('firstThree', 
  '첫 3자는 010, 011,016, 017, 018, 019 중에 하나이여야 됩니다', 
  v => v && firstThree.includes(v.substring(0, 3)))
  .required('필수')

export default schema;