<template>
  <div v-if="showCasesLoadingStatus !== 'pending'">
    <ShowCarousel :slides="mainSlides">
      <template #title>{{ showCases?.name }}</template>
    </ShowCarousel>
    <CollectionContentList
      v-for="collectionId in anotherCollectionsIds"
      :key="collectionId"
      :collection-id="collectionId"
      :max-content-count="5"
      :show-link="true"
    ></CollectionContentList>
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts" setup>
import { useAsyncData } from '#app';
import { computed } from 'vue';
import ShowCarousel from '../show/ShowCarousel.vue';
import { getMainPageShowCases } from './api/get-mainpage-showcases';
import type { TShowCard } from '../show/types/show-card';
import CollectionContentList from '../collection/CollectionContentList.vue';

const { data: showCases, status: showCasesLoadingStatus } = useAsyncData(() => getMainPageShowCases());

const mainSlides = computed(() => {
  const showCaseSlides = showCases.value?.slides ?? [];

  return showCaseSlides.map((slide): TShowCard => {
    return {
      id: slide.oid,
      title: slide.title.title ?? '',
      description: slide.title.synopsis ?? '',
      assets: slide.title.assets,
      genres: slide.title.genres,
      labels: slide.title.labels,
      kind: '',
    };
  });
});

const anotherCollectionsIds = computed(() => {
  return showCases.value?.collections.map((collection) => collection.oid.split(':')[1]) ?? [];
});
</script>
