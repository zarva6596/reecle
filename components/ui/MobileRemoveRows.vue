<template>
  <div>
    <div class="mobile-remove-rows" :class="count && !showModal && 'active'">
      <div class="mobile-remove-rows__counts">
        <div class="mobile-remove-rows__close" @click="onCloseRemoveRows">
          <ReecleeIcon icon="cancel-remove" alt="Cancel icon" />
        </div>
        <div>
          <span>Вибрано</span>
          <span>{{ count }}</span>
        </div>
      </div>

      <div class="mobile-remove-rows__remove-btn" @click="onOpenModal">
        <ReecleeIcon icon="trash" alt="Trash icon" />
        <span>Видалити</span>
      </div>
    </div>

    <transition name="fade">
      <ReecleModal
        v-if="showModal"
        v-bind="modalData"
        @ok="onRemoveRows"
        @cancel="onCloseModal"
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRecleeStore } from '~/store/useRecleeStore';
import { ButtonTypes } from '~/constants/button';
import ReecleeIcon from '~/components/universal/ReecleeIcon.vue';
import ReecleModal from '~/components/universal/ReecleModal.vue';

const store = useRecleeStore();

const { rowsToTrash } = storeToRefs(store);

const count = computed(() => rowsToTrash.value.length);

const onCloseRemoveRows = () => (rowsToTrash.value = []);

const onRemoveRows = () => {
  store.removeRows();
  onCloseModal();
};

const modalData = ref({
  title: 'Це незворотня дія',
  description: 'Ви дійсно хочете видалити вибрані записи?',
  ok: {
    title: 'Delete',
    type: ButtonTypes.DANGER,
  },
  cancel: {
    title: 'Cancel',
    type: ButtonTypes.PRIMARY,
  },
});

const showModal = ref(false);

const onOpenModal = () => (showModal.value = true);
const onCloseModal = () => (showModal.value = false);
</script>
