<template>
  <RecleeTextField
    v-model="comment.value"
    @leave-empty-field="removeTextComment(rowId, commentId)"
    @touchstart="onStartTouch"
    @touchend="onEndTouch"
  />
</template>

<script setup lang="ts">
import RecleeTextField from '~/components/form/RecleeTextField.vue';
import { useRecleeStore } from '~/store/useRecleeStore';
import { Row, TextComment } from '~/types/row';

const { removeTextComment, getRow } = useRecleeStore();

interface Props {
  rowId: string
  commentId: string
}

const props = defineProps<Props>();

const row = getRow(props.rowId).value as Row;
const comment = computed(() => row.comments.find(item => item.id === props.commentId) as TextComment);

const onStartTouch = () => {
};

const onEndTouch = () => {
};
</script>
