<template>
  <div
    :class="[
      ROW_ELEMENTS.AUDIO_CONTROL_BTN,
      {
        [AUDIO_STATE.RECORD]: audioBtnState === AUDIO_STATE.RECORD,
        [AUDIO_STATE.DONE]: audioBtnState === AUDIO_STATE.DONE,
        [AUDIO_STATE.PLAY]: audioBtnState === AUDIO_STATE.PLAY
      }
    ]"
    @click="onClickAudioBtn"
  >
    <transition name="fade">
      <img v-if="audioBtnState === AUDIO_STATE.EMPTY" :src="MicIcon" alt="Mic icon">

      <div v-else>
        <transition name="fade">
          <img v-if="audioBtnState === AUDIO_STATE.RECORD" :src="RedMicIcon" alt="Mic icon record">
          <img v-else-if="audioBtnState === AUDIO_STATE.PLAY" :src="PauseIcon" alt="Pause icon">
          <img v-else-if="audioBtnState === AUDIO_STATE.DONE" :src="PlayIcon" alt="Play icon">
        </transition>

        <div>|</div>

        <AudioTimer />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import MicIcon from 'assets/icons/mic.svg';
import RedMicIcon from 'assets/icons/mic-red.svg';
import PauseIcon from 'assets/icons/pause.svg';
import PlayIcon from 'assets/icons/play.svg';
import AudioTimer from '~/components/ui/audio/AudioTimer.vue';
import { ROW_ELEMENTS } from '~/constants/row';

const AUDIO_STATE = {
  EMPTY: 'empty',
  RECORD: 'record',
  DONE: 'done',
  PLAY: 'play',
} as const;

const audioBtnState = ref<typeof AUDIO_STATE[keyof typeof AUDIO_STATE]>(AUDIO_STATE.EMPTY);

const onClickAudioBtn = () => {
  switch (audioBtnState.value) {
    case AUDIO_STATE.EMPTY:
      audioBtnState.value = AUDIO_STATE.RECORD;
      break;
    case AUDIO_STATE.DONE:
      audioBtnState.value = AUDIO_STATE.PLAY;
      break;
    default:
      audioBtnState.value = AUDIO_STATE.DONE;
  }
};
</script>
