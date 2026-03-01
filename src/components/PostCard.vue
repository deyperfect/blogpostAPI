<script setup>
import { useRouter } from 'vue-router';
import GlassCard from './GlassCard.vue';

const router = useRouter();

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

function openPost() {
  const id = props.post.id ?? props.post._id ?? props.post.slug;
  if (!id) return;
  router.push({ name: 'PostView', params: { id } });
}
</script>

<template>
  <GlassCard as="article" class="post-card" padding="1.25rem" @click="openPost">
    <h2 class="post-card-title">
      {{ post.title }}
    </h2>
    <p v-if="post.excerpt || post.summary" class="post-card-excerpt">
      {{ post.excerpt || post.summary }}
    </p>
    <p v-else class="post-card-excerpt post-card-excerpt--muted">
      No excerpt available. Click to read more.
    </p>

    <div class="post-card-meta">
      <span class="meta-author" v-if="post.author">
        {{ post.author.name || post.author.username || post.author }}
      </span>
      <span class="meta-dot" />
      <span class="meta-date" v-if="post.createdAt || post.publishedAt">
        {{ new Date(post.publishedAt || post.createdAt).toLocaleDateString() }}
      </span>
    </div>
  </GlassCard>
</template>