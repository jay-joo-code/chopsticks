import axios from 'axios';
import cfg from 'src/config';

let baseURL = cfg.BASE;

if (process.env.NODE_ENV === 'production') {
  if (process.env.REACT_APP_ENV === 'release') {
    baseURL = cfg.BASE_RELEASE
  } else{
    baseURL = cfg.BASE_PROD
  }
}

console.log('API BASE', baseURL);

const api = axios.create({
  baseURL
});

export default api;