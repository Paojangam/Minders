// src/api.js
import axios from 'axios';

// Determine base URL automatically if env variable is not set
const baseURL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://your-production-url.com');

const api = axios.create({
  baseURL: baseURL, // uses .env or falls back to localhost/production
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers if available
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
// api.js
export async function sendChatMessage(message) {
  const res = await fetch(`/api/support/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Server error ${res.status}: ${txt}`);
  }
  return res.json();
}

export async function getResources() {
  const res = await fetch(`/api/support/resources`);
  if (!res.ok) throw new Error("Failed to load resources");
  return res.json();
}


export default api;
