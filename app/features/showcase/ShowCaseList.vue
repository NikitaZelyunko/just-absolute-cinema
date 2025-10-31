<template>
  <div v-if="showCasesLoadingStatus !== 'pending'">
    <!-- <ShowCarousel :slides="slides">
      <template #title>{{ showCase?.name }}</template>
    </ShowCarousel> -->
  </div>
  <div v-else>Loading...</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { getShowCase } from './api/get-showcase';
import { useAsyncData } from '#app';
import ShowCarousel from '../show/ShowCarousel.vue';

const props = defineProps<{ collectionId: string }>();

const { data: showCases, status: showCasesLoadingStatus } = useAsyncData(() =>
  getShowCase({ collectionId: props.collectionId, page: 1, page_size: 10 }),
);

const slides = computed(() => {
  console.log('');
  return showCases.value ?? [];
});
</script>
