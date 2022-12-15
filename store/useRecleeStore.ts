import { defineStore } from 'pinia';
import { Row } from '~/types/row';

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

  const changeCaption = (id: string, val: string, height: number) => {
    rows.value = rows.value.map(item => item.id === id ? { ...item, caption: val, captionHeight: height } : item);
  };

  const rowsToTrash = ref<string[]>([]);

  const removeRows = () => {
    rows.value = rows.value.filter(rowItem => !rowsToTrash.value.includes(rowItem.id));
    rowsToTrash.value = [];
  };

  return {
    rows,
    addNewRows,
    changeCaption,
    getRow,
    activeRowId,
    rowsToTrash,
    removeRows,
  };
});
