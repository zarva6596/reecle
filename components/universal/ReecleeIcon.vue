<template>
  <img :src="getIcon" :alt="`${alt} icon`">
</template>

<script lang="ts" setup>
interface Props {
  icon: string
  alt: string
}

const props = defineProps<Props>();

const getIcon = computed(() => `icons/${props.icon}.svg`);
</script>
