<template>
  <div
    class="reclee-text-field"
    :class="{
      empty: !data?.length,
      'not-empty': data?.length,
    }"
  >
    <textarea
      ref="textarea"
      :value="data"
      :placeholder="placeholder"
      :class="!data?.length && 'empty'"
      @keypress="removeEnter"
      @focusout="onEndType"
      @input="changeData"
    />
    <div
      ref="textFieldRef"
      class="reclee-text-field__text"
    >
      <p :class="{ hidden: !data?.length, 'not-empty': data?.length }" @click="textarea.focus()">
        {{ data }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { removeEnter } from '~/utils';

interface Props {
  placeholder?: string
  modelValue?: string
}

defineProps<Props>();

const textarea = ref<HTMLInputElement>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string):void,
  (e: 'leaveEmptyField'): void,
  (e: 'change', value: string): void
}>();

const data = ref('');

const changeData = (e: KeyboardEvent) => {
  const target = e.target as HTMLInputElement;

  if (target) {
    data.value = target.value;
    emit('update:modelValue', target.value);
    emit('change', target.value);
  }
};

const onEndType = (e: Event) => {
  const target = e.target as HTMLInputElement;

  !target?.value && emit('leaveEmptyField');
};
</script>
