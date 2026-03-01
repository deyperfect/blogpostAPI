<script setup>
const props = defineProps({
  maxWidth: {
    type: String,
    default: '720px'
  },
  padding: {
    type: String,
    default: '1.5rem'
  },
  as: {
    type: String,
    default: 'section'
  }
});
</script>

<template>
  <component
    :is="as"
    class="glass-card"
    :style="{ maxWidth: maxWidth, padding: padding }"
  >
    <slot />
  </component>
</template>