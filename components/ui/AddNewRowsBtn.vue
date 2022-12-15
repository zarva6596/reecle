<template>
  <div
    class="add-new-rows-btn"
    :class="{ 'open-trash': rowsToTrash.length }"
    @click="addNewRows"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRecleeStore } from '~/store/useRecleeStore';

const recleeStore = useRecleeStore();
const { rowsToTrash } = storeToRefs(useRecleeStore());

const addNewRows = () => recleeStore.addNewRows();
</script>
