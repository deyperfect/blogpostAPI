<script setup>
import { onMounted, ref, watch } from 'vue';
import { useAuthStore } from './stores/auth';
import Navbar from './components/Navbar.vue';

const authStore = useAuthStore();
const theme = ref('dark');

const applyTheme = (value) => {
  const safeValue = value === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', safeValue);
};

onMounted(() => {
  authStore.restoreFromStorage();

  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    theme.value = stored;
  }

  applyTheme(theme.value);
});

watch(
  theme,
  (value) => {
    applyTheme(value);
    window.localStorage.setItem('theme', value);
  },
  { immediate: false }
);

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
};
</script>

<template>
  <div class="app-root">
    <Navbar :theme="theme" @toggle-theme="toggleTheme" />

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>