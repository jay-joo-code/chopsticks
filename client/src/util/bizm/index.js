import axios from 'axios';

const BASE_DEV = 'https://dev-alimtalk-api.bizmsg.kr:1443';
const BASE_PROD = 'https://alimtalk-api.bizmsg.kr';

const isDev = process.env.NODE_ENV === 'development';
const BASE =  isDev ? BASE_DEV : BASE_PROD;

const bizm = axios.create({
  baseURL: BASE,
  headers: {'userid': 'PREPAY_USER'}
});

export const sendAlert = (msg) => {
  const data = {
    'message_type': 'AT',
    'phn': '+8201048648254',
    'profile': '89823b83f2182b1e229c2e95e21cf5e6301eed98',
    'reserveDt': '00000000000000',
    'tmplId': 'alimtalktest_003',
    'msg': '테스트'
  }
  
  console.log('sending request', data);
  
  bizm.post(`/v2/sender/send`, data)
    .then((res) => {
      console.log('sendAlert res', res.data);
    })
    .catch((e) => {
      console.log('sendAlert error', e);
    })
}