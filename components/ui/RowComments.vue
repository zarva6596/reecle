<template>
  <div class="row-comments">
    <div class="row-comments__add-buttons" :class="addComment && 'active'">
      <div class="row-comments__add-button">
        <ReecleeIcon icon="text-comment-btn" alt="text comment icon" />
        <span>text comment</span>
      </div>
      <div class="row-comments__add-button">
        <ReecleeIcon icon="audio-comment-btn" alt="audio comment icon" />
        <span>audio</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReecleeIcon from '~/components/universal/ReecleeIcon.vue';

interface Props {
  addComment: boolean | unknown
}

defineProps<Props>();
</script>
