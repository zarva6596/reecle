<template>
  <div :class="ROW_ELEMENTS.ROW_COMMENTS">
    <div v-if="row?.comments?.length" class="row-comments__list">
      <template
        v-for="comment in row.comments"
        :key="comment.id"
      >
        <RowTextComment
          v-if="comment.type === ROW_COMMENTS_TYPE.TEXT"
          :id="comment.id"
          :row-id="rowId"
          :comment-id="comment.id"
          class="row-comments__text-comment"
          @leave-empty-field="removeTextComment(rowId, comment.id)"
        />
        <div v-else-if="comment.type === ROW_COMMENTS_TYPE.AUDIO">
          Audion Comment
        </div>
      </template>
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
import { ROW_COMMENTS_TYPE, ROW_ELEMENTS } from '~/constants/row';
import ReecleeIcon from '~/components/universal/ReecleeIcon.vue';
import { useRecleeStore } from '~/store/useRecleeStore';
import { focusNewComment } from '#imports';
import RowTextComment from '~/components/ui/RowTextComment.vue';

const { getRow, addTextComment, removeTextComment } = useRecleeStore();

interface Props {
  rowId: string
  modelValue: boolean
  addComment: boolean | unknown
}

const props = defineProps<Props>();
const emit = defineEmits<{(e: 'update:modelValue', val: boolean):void}>();

const row = getRow(props.rowId);

const onStartCreateTextComment = () => {
  addTextComment(props.rowId);
  emit('update:modelValue', false);

  focusNewComment(props.rowId);
};
</script>
