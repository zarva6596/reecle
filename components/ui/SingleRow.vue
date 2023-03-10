<template>
  <div class="single-row">
    <div
      :id="id"
      ref="rowRef"
      class="single-row__row"
      :class="{
        'items-center': ((captionHeight <= 26) && row.audioRecords?.length === 1),
        active: activeRowId === id,
        'not-active': activeRowId && activeRowId !== id,
        'open-trash': rowsToTrash.length
      }"
      @click="onEnterRow"
      @touchmove="moveRow"
      @touchstart="onStartTouch"
      @touchend="onEndTouch"
    >
      <div class="single-row__audio-col">
        <AudioList :id="id" />
      </div>

      <div class="single-row__data-col">
        <div ref="rowCaption">
          <RowCaption :id="id" />
        </div>

        <RowComments v-model="addComment" :add-comment="addCommentActive" :row-id="id" />
      </div>
    </div>

    <div
      class="single-row__comment-marker"
      :class="showCommentMarker && 'active'"
      @click="onStartComment"
    >
      <ReecleeIcon icon="forward" alt="Comment marker arrow" />
      <span>коментувати</span>
    </div>

    <div
      class="single-row__marker"
      :class="{ show: rowsToTrash.length, active: chosenRow }"
      @click="onChooseRow"
    >
      <ReecleeIcon v-if="chosenRow" icon="done-marker" alt="done marker" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import RowCaption from '~/components/ui/RowCaption.vue';
import RowComments from '~/components/ui/RowComments.vue';
import AudioList from '~/components/ui/audio/AudioList.vue';
import { useRecleeStore } from '~/store/useRecleeStore';
import { ROW_ELEMENTS } from '~/constants/row';
import ReecleeIcon from '~/components/universal/ReecleeIcon.vue';

const { activeRowId, rowsToTrash } = storeToRefs(useRecleeStore());

interface Props {
  id: string
  moveRowId: string | null | unknown
}

const props = defineProps<Props>();
const emit = defineEmits<{(e: 'start-move', data: string): void }>();

const rowCaption = ref<HTMLElement>();
const captionHeight = ref<number>(0);

watch(() => props.moveRowId, val => (props.id !== val) && onRowToDefault());

const row = useRecleeStore().getRow(props.id);

watch(() => row.value?.caption, () => rowCaption.value && (captionHeight.value = rowCaption.value.clientHeight));

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

  if ((!contains && !rowsToTrash.value.length && !addCommentActive.value) || activeRowId.value) {
    activeRowId.value = activeRowId.value ? null : props.id;
    onRowToDefault();
  }
};

const rowRef = ref<HTMLElement>();

const moveRow = (e: TouchEvent) => {
  if (activeRowId.value) {
    return;
  }

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
const showCommentMarker = computed<boolean>(() => (moveEndX.value ? Math.abs(moveEndX.value) > 120 : false));

const onLongTouch = () => (!activeRowId.value && rowsToTrash.value.push(props.id));
const onStartTouch = (e: TouchEvent) => {
  emit('start-move', props.id);
  touchStartTimeStamp.value = e.timeStamp;
  moveStartX.value = e.touches[0].clientX;
};

const onEndTouch = (e: TouchEvent) => {
  touchEndTimeStamp.value = e.timeStamp;

  if (touchStartTimeStamp.value) {
    const timestamp = touchEndTimeStamp.value - touchStartTimeStamp.value;

    if (timestamp > 300 && rowRef.value) {
      e.preventDefault();

      const comment = rowRef.value.querySelector(`.${ROW_ELEMENTS.ROW_COMMENTS}`);
      const target = e.target as HTMLElement;

      if (comment?.contains(target)) {
        return;
      }

      !moveEndX.value && onLongTouch();
    }

    (moveEndX.value && Math.abs(moveEndX.value) < 124) && onRowToDefault();
  }
};

const onRowToDefault = () => {
  moveEndX.value = null;
  rowRef.value && (rowRef.value.style.transform = '');
  addComment.value && (addComment.value = false);
};

const addComment = ref(false);
const addCommentActive = computed<boolean>(() => addComment.value && props.moveRowId === props.id);

const onStartComment = () => {
  onRowToDefault();
  setTimeout(() => (addComment.value = true), 100);
};

const clickOutside = () => onRowToDefault();

const onCheckClick = (e: Event) =>
  (e.target instanceof HTMLElement && rowRef.value && !rowRef.value.contains(e.target))
    && clickOutside();

onMounted(() => nextTick(() => document.addEventListener('click', onCheckClick)));
onUnmounted(() => document.removeEventListener('click', onCheckClick));
</script>
