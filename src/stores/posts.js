import { defineStore } from 'pinia';
import api from '../services/api';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    currentPost: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await api.get('/posts');
        this.posts = Array.isArray(data) ? data : data.posts || [];
      } catch (err) {
        this.error =
          err?.response?.data?.message ||
          'Failed to load posts.';
      } finally {
        this.loading = false;
      }
    },

    async fetchPostById(id) {
      this.loading = true;
      this.error = null;
      this.currentPost = null;
      try {
        const { data } = await api.get(`/posts/${id}`);
        this.currentPost = data;
      } catch (err) {
        this.error =
          err?.response?.data?.message ||
          'Failed to load the post.';
      } finally {
        this.loading = false;
      }
    }
  }
});