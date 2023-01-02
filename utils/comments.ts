import { Row, TextComment } from '~/types/row';
import { useRecleeStore } from '~/store/useRecleeStore';
import { nextTick } from '#imports';

const { getRow } = useRecleeStore();

export const focusNewComment = (id: string) => {
  const row = getRow(id).value as Row;

  if (row?.comments?.length) {
    const newComment = row.comments.at(-1) as TextComment;

    nextTick(() => {
      const newCommentEl = document.getElementById(newComment.id) as HTMLElement;
      const textarea = newCommentEl.querySelector('textarea') as HTMLElement;

      textarea.focus();
    });
  }
};
