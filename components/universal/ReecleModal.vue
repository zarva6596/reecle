<template>
  <div class="reecle-modal">
    <div class="reecle-modal__form">
      <h2 v-if="title" class="reecle-modal__title">
        {{ title }}
      </h2>
      <p v-if="description" class="reecle-modal__description">
        {{ description }}
      </p>

      <div class="reecle-modal__content">
        <slot />
      </div>

      <div class="reecle-modal__actions" :class="hideCancel && hideOk && 'hidden'">
        <ReecleButton v-if="!hideCancel" v-bind="cancel" @click="onCancel">
          {{ cancel.title }}
        </ReecleButton>

        <ReecleButton v-if="!hideOk" v-bind="ok" @click="onOk">
          {{ ok.title }}
        </ReecleButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ButtonTypes } from '~/constants/button';
import ReecleButton from '~/components/form/ReecleButton.vue';

interface Button {
  title: string
  type: string
}

interface Props {
  title?: string
  description?: string
  ok: Button
  cancel: Button
  hideOk?: boolean
  hideCancel?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  ok: () => ({
    title: 'Ok',
    type: ButtonTypes.PRIMARY,
  }),
  cancel: () => ({
    title: 'Cancel',
    type: ButtonTypes.DANGER,
  }),
  hideOk: false,
  hideCancel: false,
});

const emit = defineEmits<{(e: 'cancel'): void, (e: 'ok'): void}>();

const onCancel = () => emit('cancel');
const onOk = () => emit('ok');
</script>
