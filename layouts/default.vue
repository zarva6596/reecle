<template>
  <div class="default-layout">
    <AppHeader />

    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/general/AppHeader.vue';
</script>
