<script setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import GlassCard from '../components/GlassCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const router = useRouter();
const authStore = useAuthStore();
const { loading, error } = storeToRefs(authStore);

const form = reactive({
  email: '',
  password: ''
});

const canSubmit = computed(
  () => form.email.trim() !== '' && form.password.trim() !== '' && !loading.value
);

async function handleSubmit() {
  if (!canSubmit.value) return;
  try {
    await authStore.login({
      email: form.email.trim(),
      password: form.password
    });
    router.push({ name: 'Home' });
  } catch {
    // error is already set on the store; nothing else required
  }
}
</script>

<template>
  <section class="page page-auth">
    <GlassCard maxWidth="420px">
      <h1 class="page-title">Login</h1>
      <p class="page-subtitle">
        Welcome back. Sign in to continue.
      </p>

      <form class="auth-form" @submit.prevent="handleSubmit">
        <label class="field">
          <span class="field-label">Email</span>
          <input
            v-model="form.email"
            type="email"
            class="field-input"
            placeholder="you@example.com"
            autocomplete="email"
            required
          />
        </label>

        <label class="field">
          <span class="field-label">Password</span>
          <input
            v-model="form.password"
            type="password"
            class="field-input"
            placeholder="••••••••"
            autocomplete="current-password"
            required
          />
        </label>

        <p v-if="error" class="error-text">
          {{ error }}
        </p>

        <button class="btn-primary" type="submit" :disabled="!canSubmit">
          <span v-if="!loading">Login</span>
          <span v-else>Signing in...</span>
        </button>

        <LoadingSpinner v-if="loading" />
      </form>

      <p class="auth-alt">
        Don’t have an account?
        <router-link to="/register">Create one</router-link>
      </p>
    </GlassCard>
  </section>
</template>