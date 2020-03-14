import axios from 'axios';
import cfg from 'src/config';

const api = axios.create({
  baseURL: cfg.BASE
});

export default api;