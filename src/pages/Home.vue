<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../stores/posts';
import GlassCard from '../components/GlassCard.vue';
import PostCard from '../components/PostCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const postsStore = usePostsStore();
const { posts, loading, error } = storeToRefs(postsStore);

onMounted(() => {
  if (!posts.value.length) {
    postsStore.fetchPosts();
  }
});
</script>

<template>
  <section class="page page-home">
    <GlassCard maxWidth="960px" padding="2rem" class="home-hero">
      <h1 class="page-title">Latest posts</h1>
      <p class="page-subtitle">
        Thoughts, stories, and ideas presented through a liquid-glass lens.
      </p>
    </GlassCard>

    <div class="posts-list">
      <LoadingSpinner v-if="loading" />

      <p v-else-if="error" class="error-text">
        {{ error }}
      </p>

      <p v-else-if="!posts.length" class="empty-text">
        No posts yet. Check back soon!
      </p>

      <div v-else class="posts-grid">
        <PostCard v-for="post in posts" :key="post.id || post._id" :post="post" />
      </div>
    </div>
  </section>
</template>