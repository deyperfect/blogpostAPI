import { defineStore } from 'pinia';
import api from '../services/api';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    currentUser: null,
    loading: false,
    error: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login({ email, password }) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await api.post('/auth/login', { email, password });

        const token = data.token;
        const user = data.user ?? null;

        this.token = token;
        this.currentUser = user;

        window.localStorage.setItem(TOKEN_KEY, token);
        if (user) {
          window.localStorage.setItem(USER_KEY, JSON.stringify(user));
        } else {
          window.localStorage.removeItem(USER_KEY);
        }

        return data;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          'Login failed. Please check your credentials.';
        this.error = message;
        throw new Error(message);
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.currentUser = null;
      this.error = null;
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(USER_KEY);
    },

    restoreFromStorage() {
      const storedToken = window.localStorage.getItem(TOKEN_KEY);
      const storedUser = window.localStorage.getItem(USER_KEY);

      this.token = storedToken || null;
      this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    }
  }
});