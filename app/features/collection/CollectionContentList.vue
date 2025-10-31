<template>
  <div v-if="!loading" class="flex flex-col">
    <ShowCarousel :slides="slides">
      <template #title>
        <NuxtLink v-if="props.showLink" :to="`/showcase/${collectionId}`">
          {{ showCaseCollection?.name }}
        </NuxtLink>
        <template v-else>
          {{ showCaseCollection?.name }}
        </template>
      </template>
    </ShowCarousel>
    <NuxtButton class="self-center" v-if="nextButtonShown" @click="loadNewContent" :loading="collectionLoading">
      Показать ещё
    </NuxtButton>
  </div>
  <div v-else>Loading...</div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useAsyncData } from '#app';
import ShowCarousel from '../show/ShowCarousel.vue';
import type { TShowCard } from '../show/types/show-card';
import { getShowCaseCollectionContent } from './api/get-showcase-collection';
import { getShowCaseCollection } from './api/get-showcase-collection-content';
import type { TCollectionContentResponse } from './types/collection-content';

const props = defineProps<{ collectionId: string; maxContentCount?: number; showLink: boolean }>();

const { data: showCaseCollection, status: showCaseCollectionLoadingStatus } = useAsyncData(
  `collection-data-${props.collectionId}`,
  () => getShowCaseCollection({ collectionId: props.collectionId }),
  { lazy: true },
);

const page = ref(1);
const pageSize = props.maxContentCount ?? 5;
const firstCollectionContentChunk = useAsyncData(
  `collection-content-${props.collectionId}-${page.value}-${pageSize}`,
  () => getShowCaseCollectionContent({ collectionId: props.collectionId, page: page.value, pageSize: pageSize }),
  { lazy: true },
);

const loading = computed(() => {
  return showCaseCollectionLoadingStatus.value === 'pending' || firstCollectionContentChunk.status.value === 'pending';
});

function createShowCard(slide: TCollectionContentResponse): TShowCard {
  return {
    id: slide.oid,
    title: slide.title,
    description: slide.synopsis,
    assets: slide.assets,
    genres: slide.genres,
    labels: slide.labels,
    kind: slide.kind,
  };
}

const firstSlides = computed(() => {
  const showCaseFirstChunk = firstCollectionContentChunk.data.value?.results ?? [];

  return showCaseFirstChunk.map(createShowCard);
});

const anotherSlides = ref<TShowCard[]>([]);

const collectionLoading = ref(false);

const hasNext = ref<boolean | undefined>(firstCollectionContentChunk.data.value?.has_next ?? undefined);

const nextButtonShown = computed(() => typeof props.maxContentCount === 'undefined' && hasNext.value);
watch(
  () => firstCollectionContentChunk.data.value,
  (newData) => {
    if (typeof hasNext.value === 'boolean') {
      return;
    }
    if (!newData) {
      return;
    }
    hasNext.value = newData.has_next;
  },
  { immediate: true },
);

async function loadNewContent() {
  if (!hasNext.value || collectionLoading.value) {
    return;
  }

  collectionLoading.value = true;

  try {
    const newCollectionContentChunk = await getShowCaseCollectionContent({
      collectionId: props.collectionId,
      page: page.value + 1,
      pageSize,
    });
    hasNext.value = newCollectionContentChunk.has_next;
    page.value = page.value + 1;
    const newShowCards = newCollectionContentChunk.results.map(createShowCard);
    anotherSlides.value = anotherSlides.value.concat(newShowCards);
  } finally {
    collectionLoading.value = false;
  }
}

const slides = computed(() => {
  return firstSlides.value.concat(anotherSlides.value);
});
</script>
