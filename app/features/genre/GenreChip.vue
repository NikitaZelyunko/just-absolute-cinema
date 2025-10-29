<template>
  <div>
    {{ genresMap }}
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useGenresStore } from './store/use-genres-store';

defineProps<{ id: string }>();

const genresStore = useGenresStore();
genresStore.getAsyncGenresMap();
const genresMap = computed(() => genresStore.genresMap);
// const genresMap = genresStore.genresMap;
// const genresMap = await genresStore.getAsyncGenresMap();
</script>
