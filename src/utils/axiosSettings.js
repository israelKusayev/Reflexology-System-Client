import axios from 'axios';
import history from '../utils/history';

console.log(process.env);

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://reflexology-system-server.herokuapp.com';

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use(null, error => {
  if (error.response.status === 401) history.push('/login');

  return Promise.reject(error);
});
