import axios from 'axios';

const BASE_DEV = 'https://dev-alimtalk-api.bizmsg.kr:1443';
const BASE_PROD = 'https://alimtalk-api.bizmsg.kr';

const bizm = axios.create({
  baseURL: BASE_PROD,
  headers: {'userid': 'chopsticks'}
});

const formatNumber = (number) => {
  return '+82' + number.substr(1);
}

export const sendAlert = (number) => {
  const data = [{
    'message_type': 'AT',
    'phn': formatNumber(number),
    'profile': 'beaed98a65b993e706e963a8aa941c2db48e4938',
    'reserveDt': '00000000000000',
    'tmplId': 'chopsticks_template_01',
    'msg': '재형님의 택배가 (10:00)에 발송되었습니다. '
  }]
  
  bizm.post(`/v2/sender/send`, data)
    .then((res) => {
      console.log('sendAlert res', res.data);
    })
    .catch((e) => {
      console.log('sendAlert error', e);
    })
}