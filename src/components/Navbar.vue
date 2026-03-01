<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const props = defineProps({
  theme: {
    type: String,
    default: 'dark'
  }
});

const emit = defineEmits(['toggle-theme']);

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const currentUser = computed(() => authStore.currentUser);

const isActive = (name) => route.name === name;

function goHome() {
  router.push({ name: 'Home' });
}

function goLogin() {
  router.push({ name: 'Login' });
}

function goRegister() {
  router.push({ name: 'Register' });
}

function handleLogout() {
  authStore.logout();
  router.push({ name: 'Home' });
}

function onToggleTheme() {
  emit('toggle-theme');
}
</script>

<template>
  <header class="navbar glass-card">
    <div class="navbar-left" @click="goHome">
      <span class="logo-circle"></span>
      <span class="navbar-title">Liquid Glass Blog</span>
    </div>

    <nav class="navbar-links">
      <button
        class="nav-link"
        :class="{ 'nav-link--active': isActive('Home') }"
        @click="goHome"
      >
        Home
      </button>

      <template v-if="!isAuthenticated">
        <button
          class="nav-link"
          :class="{ 'nav-link--active': isActive('Login') }"
          @click="goLogin"
        >
          Login
        </button>
        <button
          class="nav-link nav-link--primary"
          :class="{ 'nav-link--active': isActive('Register') }"
          @click="goRegister"
        >
          Register
        </button>
      </template>

      <template v-else>
        <span class="navbar-user" v-if="currentUser">
          {{ currentUser.username || currentUser.email }}
        </span>
        <button class="nav-link nav-link--danger" @click="handleLogout">
          Logout
        </button>
      </template>

      <button class="nav-link nav-link--icon" type="button" @click="onToggleTheme">
        <span v-if="theme === 'dark'">Light</span>
        <span v-else>Dark</span>
      </button>
    </nav>
  </header>
</template>