import { defineStore } from 'pinia';
import { Row, TextComment } from '~/types/row';

export const useRecleeStore = defineStore('useRecleeStore', () => {
  const rows = ref<Row[]>([]);
  const activeRowId = ref<string | null>(null);

  const addNewRows = (n = 1): void => {
    for (let i = 0; i < n; i++) {
      const rowId = random();
      const audioId = `audio-${rowId}-${random()}`;

      rows.value.push({ id: rowId, audioRecords: [{ id: audioId }] });
    }
  };

  const getRow = (id: string) => computed<Row | undefined>(() => rows.value.find(item => item.id === id));

  const changeCaption = (id: string, val: string) => {
    rows.value = rows.value.map(item => item.id === id ? { ...item, caption: val } : item);
  };

  const rowsToTrash = ref<string[]>([]);

  const removeRows = () => {
    rows.value = rows.value.filter(rowItem => !rowsToTrash.value.includes(rowItem.id));
    rowsToTrash.value = [];
  };

  const addTextComment = (rowId: string) => {
    const editorRow = getRow(rowId).value;
    const id = random();
    const comment = { id, value: '' } as TextComment;

    if (editorRow) {
      editorRow.textComments?.length ? editorRow.textComments.push(comment) : (editorRow.textComments = [comment]);
    }
  };

  const removeTextComment = (rowId: string, commentId: string) => {
    const editorRow = getRow(rowId).value;

    if (editorRow?.textComments) {
      editorRow.textComments = editorRow.textComments.filter(comment => comment.id !== commentId);
    }
  };

  const editTextComment = (rowId: string, commentId: string, value: string) => {
    const editorRow = getRow(rowId).value;

    if (editorRow?.textComments) {
      if (value.length) {
        const editorComment = editorRow.textComments.find(comment => comment.id === commentId);

        editorComment && (editorComment.value = value);
      } else {
        removeTextComment(rowId, commentId);
      }
    }
  };

  return {
    rows,
    addNewRows,
    changeCaption,
    getRow,
    activeRowId,
    rowsToTrash,
    removeRows,
    addTextComment,
    editTextComment,
    removeTextComment,
  };
});
