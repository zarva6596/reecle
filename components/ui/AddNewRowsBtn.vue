<template>
  <div
    class="add-new-rows__main-btn"
    :class="{ 'open-trash': rowsToTrash.length || showCountWrapper }"
    @click="onAddNewRows"
  />

  <div class="add-new-rows__wrapper" :class="showCountWrapper && 'active'">
    <div class="add-new-rows__count-btn" @click="onAddNewRows">
      Додати <span>{{ countRows }}</span> рядків
    </div>

    <div class="add-new-rows__more-btn" @click="onMinus">
      -
    </div>
    <div class="add-new-rows__more-btn" @click="onPlus">
      +
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRecleeStore } from '~/store/useRecleeStore';

const recleeStore = useRecleeStore();
const { rowsToTrash } = storeToRefs(useRecleeStore());

const countClick = ref(0);
const countRows = ref(1);

const onAddNewRows = () => {
  if (countClick.value === 0) {
    recleeStore.addNewRows();
  }

  if (showCountWrapper.value) {
    recleeStore.addNewRows(countRows.value);
    onHideCountWrapper();
  } else {
    countClick.value = countClick.value + 1;
  }
};

const onPlus = () => (countRows.value = countRows.value + 1);
const onMinus = () => {
  countRows.value = countRows.value - 1;

  if (countRows.value === 0) {
    countRows.value = 1;
    onHideCountWrapper();
  }
};

const onHideCountWrapper = () => {
  countClick.value = 0;
  countRows.value = 1;
};

const showCountWrapper = computed<boolean>(() => countClick.value >= 2);
</script>
