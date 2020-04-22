import axios from 'axios';
import cfg from 'src/config';

let baseURL = cfg.BASE_RELEASE;

if (process.env.NODE_ENV === 'production') {
  if (process.env.REACT_APP_ENV === 'release') {
    baseURL = cfg.BASE_RELEASE
  } else{
    baseURL = cfg.BASE_PROD
  }
}

const api = axios.create({
  baseURL
});

export default api;