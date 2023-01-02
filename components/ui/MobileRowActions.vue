<template>
  <transition name="up-from-bottom">
    <div v-if="activeRowId" class="mobile-row-actions">
      <div v-for="(wrapper, i) in actions" :key="i" class="mobile-row-actions__wrapper">
        <div v-for="(action, j) in wrapper" :key="j" class="mobile-row-actions__action" @click="action.action">
          <Icon :icon="action.icon" :alt="action.title" />
          <span>{{ action.title }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { MobileRowAction, MobileRowActionMethod } from '~/types/row';
import { useRecleeStore } from '~/store/useRecleeStore';
import Icon from '~/components/universal/ReecleeIcon.vue';
import { focusNewComment } from '#imports';

const { addTextComment } = useRecleeStore();

const { activeRowId, rowsToTrash } = storeToRefs(useRecleeStore());

const rowActions = ref<Record<string, MobileRowActionMethod>>({
  addAudio: () => {
    // eslint-disable-next-line no-console
    console.log('ADD AUDIO');
  },
  deleteAudio: () => {
    // eslint-disable-next-line no-console
    console.log('DELETE AUDIO');
  },
  addTextComment: () => {
    if (activeRowId.value) {
      addTextComment(activeRowId.value);
      focusNewComment(activeRowId.value);
    }
  },
  addAudioComment: () => {
    // eslint-disable-next-line no-console
    console.log('ADD AUDIO COMMENT');
  },
  deleteRow: () => (activeRowId.value && rowsToTrash.value.push(activeRowId.value)),
});

const rowDataItems = ref<MobileRowAction[]>([
  { icon: 'add-audio', title: 'Додати аудіозапис', action: rowActions.value.addAudio },
  { icon: 'delete-audio', title: 'Видалити аудіозапис', action: rowActions.value.deleteAudio },
  { icon: 'add-text-comment', title: 'Додати коментар', action: rowActions.value.addTextComment },
  { icon: 'add-audio-comment', title: 'Дод. аудіокоментар', action: rowActions.value.addAudioComment },
]);

const rowItems = ref<MobileRowAction[]>([
  { icon: 'remove-row', title: 'Видалити рядок', action: rowActions.value.deleteRow },
]);

const actions = ref<MobileRowAction[][]>([rowDataItems.value, rowItems.value]);
</script>
