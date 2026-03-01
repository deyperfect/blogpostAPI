<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../stores/posts';
import GlassCard from '../components/GlassCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const route = useRoute();
const postsStore = usePostsStore();
const { currentPost, loading, error } = storeToRefs(postsStore);

function load() {
  const id = route.params.id;
  if (id) {
    postsStore.fetchPostById(id);
  }
}

onMounted(load);
watch(
  () => route.params.id,
  () => load()
);
</script>

<template>
  <section class="page page-post">
    <LoadingSpinner v-if="loading" />

    <p v-else-if="error" class="error-text">
      {{ error }}
    </p>

    <p v-else-if="!currentPost" class="empty-text">
      Post not found.
    </p>

    <GlassCard v-else maxWidth="780px" padding="2rem" class="post-view-card">
      <h1 class="post-title">
        {{ currentPost.title }}
      </h1>

      <div class="post-meta">
        <span v-if="currentPost.author" class="meta-author">
          {{ currentPost.author.name || currentPost.author.username || currentPost.author }}
        </span>
        <span class="meta-dot" />
        <span v-if="currentPost.createdAt || currentPost.publishedAt" class="meta-date">
          {{ new Date(currentPost.publishedAt || currentPost.createdAt).toLocaleDateString() }}
        </span>
      </div>

      <article class="post-content">
        <p v-if="typeof currentPost.content === 'string'">
          <!-- Basic rendering; for real markdown/HTML content you can enhance this later -->
          {{ currentPost.content }}
        </p>
        <div v-else>
          <!-- Fallback for custom structures -->
          <pre>{{ currentPost.content }}</pre>
        </div>
      </article>
    </GlassCard>
  </section>
</template>