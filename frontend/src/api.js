// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://minders.onrender.com', // Update if deploying
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Automatically attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
