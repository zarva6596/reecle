<template>
  <div
    v-if="row"
    :class="ROW_ELEMENTS.ROW_CAPTION"
  >
    <RecleeTextField v-model="rowCaption" :placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
import { useRecleeStore } from '~/store/useRecleeStore';
// import { removeEnter } from '~/utils';
import { ROW_ELEMENTS } from '~/constants/row';
import RecleeTextField from '~/components/form/RecleeTextField.vue';
import { watch } from '#imports';

interface Props { id: string }

const props = defineProps<Props>();

const recleeStore = useRecleeStore();

const rowCaption = ref<string>('');

watch(() => rowCaption.value, val => changeCaption(val));

const changeCaption = (val: string) => {
  recleeStore.changeCaption(props.id, val);
};

const row = recleeStore.getRow(props.id);

const placeholder = 'Add caption';
</script>
