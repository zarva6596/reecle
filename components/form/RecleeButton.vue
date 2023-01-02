<template>
  <button class="reecle-button" :style="style">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { buttonStyles } from '~/constants/button';

interface Props {
  type: string
}

const props = defineProps<Props>();

const style = computed(() => buttonStyles[props.type]);
</script>
