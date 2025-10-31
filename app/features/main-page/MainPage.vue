<template>
  <div v-if="showCasesLoadingStatus !== 'pending'">
    <ShowCarousel :slides="mainSlides">
      <template #title>{{ showCases?.name }}</template>
    </ShowCarousel>
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts" setup>
import { useAsyncData } from '#app';
import { computed } from 'vue';
import ShowCarousel from '../show/ShowCarousel.vue';
import { getMainPageShowCases } from './api/get-mainpage-showcases';

const { data: showCases, status: showCasesLoadingStatus } = useAsyncData(() =>
  getMainPageShowCases(),
);

const mainSlides = computed(() => {
  return showCases.value?.slides ?? [];
});

// const displayedMainSlides = computed(())
</script>
