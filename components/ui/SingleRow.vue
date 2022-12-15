<template>
  <div class="single-row">
    <div
      :id="id"
      ref="rowRef"
      class="single-row__row"
      :class="{
        'items-center': ((!row.captionHeight || row.captionHeight <= 25) && row.audioRecords?.length === 1),
        active: activeRowId === id,
        'not-active': activeRowId && activeRowId !== id,
        'open-trash': rowsToTrash.length
      }"
      @click="onEnterRow"
    >
      <div class="single-row__audio-col">
        <AudioList :id="id" />
      </div>

      <div class="single-row__data-col">
        <RowCaption :id="id" />
      </div>
    </div>

    <div class="single-row__comment-marker" :class="showCommentMarker && 'active'">
      <ReecleeIcon icon="forward" alt="Comment marker arrow" />
      <span>коментувати</span>
    </div>

    <div
      class="single-row__marker"
      :class="{ show: rowsToTrash.length, active: chosenRow }"
      @click="onChooseRow"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import RowCaption from '~/components/ui/RowCaption.vue';
import AudioList from '~/components/ui/audio/AudioList.vue';
import { useRecleeStore } from '~/store/useRecleeStore';
import { ROW_ELEMENTS } from '~/constants/row';
import ReecleeIcon from '~/components/universal/ReecleeIcon.vue';

const { activeRowId, rowsToTrash } = storeToRefs(useRecleeStore());

interface Props {
  id: string
}

const props = defineProps<Props>();

const row = useRecleeStore().getRow(props.id);
const chosenRow = computed<boolean>(() => rowsToTrash.value.includes(props.id));

const onChooseRow = () => {
  if (chosenRow.value) {
    rowsToTrash.value = rowsToTrash.value.filter(rowId => rowId !== props.id);
  } else {
    rowsToTrash.value.push(props.id);
  }
};

const onEnterRow = (e: Event) => {
  const target = e.target as HTMLElement;

  const contains = Object.values(ROW_ELEMENTS).some((item) => {
    const nodeList = document.querySelectorAll(`.${item}`);
    const elements = Array.prototype.slice.call(nodeList);

    return elements.some(el => el.contains(target));
  });

  if ((!contains && !rowsToTrash.value.length) || activeRowId.value) {
    activeRowId.value = activeRowId.value ? null : props.id;
  }
};

const rowRef = ref<HTMLElement>();

const moveRow = (e: TouchEvent) => {
  e.preventDefault();

  const x = e.touches[0].clientX;

  if (x && moveStartX.value && rowRef.value) {
    const translateX = x - moveStartX.value;

    moveEndX.value = translateX;

    if (Math.abs(translateX) <= 124 && translateX < 0) {
      rowRef.value.style.transform = `translateX(${translateX}px)`;
    }
  }
};

const touchStartTimeStamp = ref<number>();
const touchEndTimeStamp = ref<number>();
const moveStartX = ref<number>();
const moveEndX = ref<number | null>();
const showCommentMarker = computed<boolean>(() => !!(moveEndX.value && Math.abs(moveEndX.value) > 120));

const onLongTouch = () => (rowsToTrash.value.push(props.id));
const startTouch = (e: TouchEvent) => {
  touchStartTimeStamp.value = e.timeStamp;
  moveStartX.value = e.touches[0].clientX;
};

const endTouch = (e: TouchEvent) => {
  touchEndTimeStamp.value = e.timeStamp;

  if (touchStartTimeStamp.value) {
    const timestamp = touchEndTimeStamp.value - touchStartTimeStamp.value;

    if (timestamp > 300) {
      e.preventDefault();
      !moveEndX.value && onLongTouch();
    }

    if (moveEndX.value && Math.abs(moveEndX.value) < 124 && rowRef.value) {
      moveEndX.value = null;
      rowRef.value.style.transform = '';
    }
  }
};

onMounted(() => nextTick(() => rowRef.value && rowRef.value.addEventListener('touchmove', moveRow)));
onMounted(() => nextTick(() => rowRef.value && rowRef.value.addEventListener('touchstart', startTouch)));
onMounted(() => nextTick(() => rowRef.value && rowRef.value.addEventListener('touchend', endTouch)));
onUnmounted(() => rowRef.value && rowRef.value.removeEventListener('touchmove', moveRow));
onUnmounted(() => rowRef.value && rowRef.value.removeEventListener('touchstart', startTouch));
onUnmounted(() => rowRef.value && rowRef.value.removeEventListener('touchend', endTouch));
</script>
