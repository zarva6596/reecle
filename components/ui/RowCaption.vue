<template>
  <div v-if="row" :class="ROW_ELEMENTS.ROW_CAPTION">
    <textarea
      :value="row.caption"
      :placeholder="placeholder"
      :class="!row.caption?.length && 'empty'"
      @keypress="removeEnter"
      @input="changeCaption"
    />
    <div
      class="row-caption__caption"
      :class="row.caption?.length && 'not-empty'"
    >
      <p :class="{ hidden: !row.caption?.length }">
        {{ row.caption }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecleeStore } from '~/store/useRecleeStore';
import { removeEnter } from '~/utils';
import { ROW_ELEMENTS } from '~/constants/row';

interface Props { id: string }

const props = defineProps<Props>();

const recleeStore = useRecleeStore();

const changeCaption = (e: KeyboardEvent) => {
  const target = e.target as HTMLInputElement;

  recleeStore.changeCaption(props.id, target.value, target.clientHeight);
};

const row = recleeStore.getRow(props.id);

const placeholder = ref<string>('Add caption');
</script>
