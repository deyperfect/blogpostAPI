<script setup>
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import GlassCard from '../components/GlassCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import api from '../services/api';

const router = useRouter();

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const loading = ref(false);
const error = ref(null);
const validationError = ref(null);

const canSubmit = computed(() => {
  return (
    form.username.trim() &&
    form.email.trim() &&
    form.password &&
    form.confirmPassword &&
    !loading.value
  );
});

async function handleSubmit() {
  if (!canSubmit.value) return;

  validationError.value = null;
  error.value = null;

  if (form.password !== form.confirmPassword) {
    validationError.value = 'Passwords do not match.';
    return;
  }

  loading.value = true;
  try {
    await api.post('/auth/register', {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password
    });
    router.push({ name: 'Login' });
  } catch (err) {
    error.value =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="page page-auth">
    <GlassCard maxWidth="460px">
      <h1 class="page-title">Register</h1>
      <p class="page-subtitle">
        Create an account to start posting and commenting.
      </p>

      <form class="auth-form" @submit.prevent="handleSubmit">
        <label class="field">
          <span class="field-label">Username</span>
          <input
            v-model="form.username"
            type="text"
            class="field-input"
            placeholder="Your username"
            autocomplete="username"
            required
          />
        </label>

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
            autocomplete="new-password"
            required
          />
        </label>

        <label class="field">
          <span class="field-label">Confirm Password</span>
          <input
            v-model="form.confirmPassword"
            type="password"
            class="field-input"
            placeholder="••••••••"
            autocomplete="new-password"
            required
          />
        </label>

        <p v-if="validationError" class="error-text">
          {{ validationError }}
        </p>
        <p v-if="error" class="error-text">
          {{ error }}
        </p>

        <button class="btn-primary" type="submit" :disabled="!canSubmit">
          <span v-if="!loading">Create account</span>
          <span v-else>Creating...</span>
        </button>

        <LoadingSpinner v-if="loading" />
      </form>

      <p class="auth-alt">
        Already have an account?
        <router-link to="/login">Login instead</router-link>
      </p>
    </GlassCard>
  </section>
</template>