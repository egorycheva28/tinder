import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://51.250.20.110:5050/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
});

export default api;
