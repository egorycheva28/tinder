import axios from 'axios';

const api = axios.create({
  baseURL: 'http://51.250.20.110:5050/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
