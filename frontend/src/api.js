// src/api.js
import axios from 'axios';

// Use environment variable instead of hardcoding
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Will be set in .env or Vercel
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
