<template>
  <div class="audio-list">
    <div v-for="audio in row.audioRecords" :key="audio.id" class="audio-list__item">
      <AudioControlBtn />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecleeStore } from '~/store/useRecleeStore';
import AudioControlBtn from '~/components/ui/audio/AudioControlBtn.vue';

interface Props {
  id: string
}

const props = defineProps<Props>();

const row = useRecleeStore().getRow(props.id);
</script>
