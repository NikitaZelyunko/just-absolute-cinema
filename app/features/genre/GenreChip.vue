<template>
  <div>
    GenreChip
    {{ genresMap }}
  </div>
</template>
<script lang="ts" setup>
import { useGenresStore } from './store/use-genres-store';

defineProps<{ id: string }>();

const genresStore = useGenresStore();
const genresMap = await genresStore.getAsyncGenresMap();
</script>
