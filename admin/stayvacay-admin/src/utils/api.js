import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // update with your backend URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
