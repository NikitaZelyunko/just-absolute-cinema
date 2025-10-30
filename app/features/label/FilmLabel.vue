<template>
  <div>
    FilmLabel
    {{ labelsMap }}
  </div>
</template>
<script lang="ts" setup>
import { useLabelsStore } from './store/use-labels-store';

defineProps<{ id: string }>();

const labelsStore = useLabelsStore();
const labelsMap = await labelsStore.getAsyncLabels();
</script>
