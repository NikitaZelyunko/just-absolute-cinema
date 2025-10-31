<template>
  <div>
    <div v-if="chipTitle">
      <nuxt-badge class="rounded-full font-bold">{{ chipTitle }}</nuxt-badge>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useLabelsStore } from './store/use-labels-store';

const props = defineProps<{ id: string }>();

const labelsStore = useLabelsStore();
const labelsMap = await labelsStore.getAsyncLabels();

const chipTitle = computed(() => {
  const chip = labelsMap.value.get(props.id);
  if (!chip) {
    return '';
  }

  return chip.name;
});
</script>
