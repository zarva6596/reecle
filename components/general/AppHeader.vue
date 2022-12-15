<template>
  <header class="header">
    <div
      class="header__title"
    >
      {{ title }}
    </div>

    <div class="header__share-btn">
      <nuxt-icon name="share" />
    </div>
  </header>
</template>

<script setup lang="ts">
const title = ref<string>('Vocabulary Set #23, January 1w');
</script>
