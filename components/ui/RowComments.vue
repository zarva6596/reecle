<template>
  <div :class="ROW_ELEMENTS.ROW_COMMENTS">
    <div v-if="row?.textComments?.length" class="row-comments__text-list">
      <RecleeTextField
        v-for="comment in row.textComments"
        :id="comment.id"
        :key="comment.id"
        v-model="comment.value"
        class="row-comments__text-comment"
      />
    </div>
    <div class="row-comments__add-buttons" :class="addComment && 'active'">
      <div class="row-comments__add-button" @click="onStartCreateTextComment">
        <ReecleeIcon icon="text-comment-btn" alt="text comment icon" />
        <span>text comment</span>
      </div>
      <div class="row-comments__add-button">
        <ReecleeIcon icon="audio-comment-btn" alt="audio comment icon" />
        <span>audio</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ROW_ELEMENTS } from '~/constants/row';
import ReecleeIcon from '~/components/universal/ReecleeIcon.vue';
import RecleeTextField from '~/components/form/RecleeTextField.vue';
import { useRecleeStore } from '~/store/useRecleeStore';
import { Row, TextComment } from '~/types/row';

const { getRow, addTextComment } = useRecleeStore();

interface Props {
  rowId: string
  modelValue: boolean
  addComment: boolean | unknown
}

const props = defineProps<Props>();
const emit = defineEmits<{(e: 'update:modelValue', val: boolean):void}>();

const row = getRow(props.rowId).value as Row;

const onStartCreateTextComment = () => {
  addTextComment(props.rowId);
  emit('update:modelValue', false);

  if (row?.textComments?.length) {
    const newComment = row.textComments.at(-1) as TextComment;

    nextTick(() => {
      const newCommentEl = document.getElementById(newComment.id) as HTMLElement;
      const textarea = newCommentEl.querySelector('textarea') as HTMLElement;

      textarea.focus();
    });
  }
};
</script>
