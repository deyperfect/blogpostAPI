import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: false
});

// Attach Bearer token when present
api.interceptors.request.use(
  (config) => {
    try {
      const authStore = useAuthStore();
      if (authStore?.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
      }
    } catch {
      const token = window.localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;