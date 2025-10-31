<template>
  <div class="text-3xl">
    <slot name="title"></slot>
  </div>

  <div class="cards-list">
    <ShowCarouselCard
      v-for="slide in slides"
      :slide="slide"
      class="basis"
    ></ShowCarouselCard>
  </div>
  <!-- Карусель вроде заработала -->
  <!-- <NuxtCarousel
    v-slot="{ item }"
    :items="slides"
    arrows
    prev-icon="i-lucide-chevron-left"
    next-icon="i-lucide-chevron-right"
    :prev="{ active: true }"
    :ui="{ item: 'basis-auto', prev: 'sm:-start-0', next: 'sm:-end-0' }"
    class="mx-auto w-full items-stretch"
  >
    <ShowCarouselCard :slide="item" class="h-full"></ShowCarouselCard>
  </NuxtCarousel> -->
</template>

<script lang="ts" setup>
import type { TSlide } from '../main-page/types/main-page-showcase';
import ShowCarouselCard from './ShowCarouselCard.vue';

defineProps<{
  slides: TSlide[];
}>();
</script>

<style scoped>
.cards-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  justify-items: center;
}
</style>
