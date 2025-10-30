<template>
  <div class="cards-list">
    <ShowCarouselCard
      v-for="slide in slides"
      :slide="slide"
      class="basis"
    ></ShowCarouselCard>
  </div>
  <!-- <NuxtCarousel
    v-slot="{ item }"
    :items="slides"
    arrows
    :ui="{ item: 'basis-auto' }"
    class="mx-auto w-full"
  >
    <ShowCarouselCard :slide="item" class="basis"></ShowCarouselCard>
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
}
</style>
