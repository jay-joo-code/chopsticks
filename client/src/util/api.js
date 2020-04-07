import axios from 'axios';
import cfg from 'src/config';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : cfg.BASE;

const api = axios.create({
  baseURL
});

export default api;