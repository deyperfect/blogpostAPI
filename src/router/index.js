import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import PostView from '../pages/PostView.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guestOnly: true }
  },
  {
    path: '/posts/:id',
    name: 'PostView',
    component: PostView,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Optional route guard to keep logged-in users out of login/register
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;