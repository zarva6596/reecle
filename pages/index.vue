<template>
  <div>
    <SingleRow v-for="row in rows" :id="row.id" :key="row.id" />

    <AddNewRowsBtn />

    <MobileRowActions />
    <MobileRemoveRows />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRecleeStore } from '~/store/useRecleeStore';
import SingleRow from '~/components/ui/SingleRow.vue';
import AddNewRowsBtn from '~/components/ui/AddNewRowsBtn.vue';
import MobileRowActions from '~/components/ui/MobileRowActions.vue';
import MobileRemoveRows from '~/components/ui/MobileRemoveRows.vue';

const { rows, activeRowId } = storeToRefs(useRecleeStore());
const recleeStore = useRecleeStore();

const closeMobileRowActions = (e: Event) => {
  const target = e.target as HTMLElement;

  if (activeRowId.value && target) {
    const el = document.getElementById(activeRowId.value);

    if (!el?.contains(target)) {
      activeRowId.value = null;
    }
  }
};

onMounted(() => {
  if (!rows.value.length) {
    recleeStore.addNewRows();
  }
});

onMounted(() => window.addEventListener('click', closeMobileRowActions));
onUnmounted(() => window.removeEventListener('click', closeMobileRowActions));
</script>
