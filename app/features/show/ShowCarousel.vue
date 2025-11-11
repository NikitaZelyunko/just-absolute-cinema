<template>
  <div class="text-3xl">
    <slot name="title"></slot>
  </div>

  <div class="cards-list">
    <template v-for="slide in slides" :key="slide.id">
      <ShowCard
        :slide="slide"
        class="basis"
        tabindex="1"
        :popover-id="fullOpenShowCardPopoverId"
        :full-view-open="slide.id === openedCardId"
        @open-full="openCard(slide.id)"
        @close-full="closeCard()"
      ></ShowCard>
      <!-- <div v-if="slide.id === openedCardId" class="show-card-full-view">FULL_VIEW: {{ openedCardId }}</div> -->
    </template>
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
import { nextTick, ref } from 'vue';
import ShowCard from './ShowCard.vue';
import type { TShowCard } from './types/show-card';

defineProps<{
  slides: TShowCard[];
}>();

const openedCardId = ref<string | undefined>(undefined);

const fullOpenShowCardPopoverId = 'full-open-show-card-popover-id';

function openCard(cardId: string) {
  openedCardId.value = cardId;
  setTimeout(() => {
    const showCardPopover = document.getElementById(fullOpenShowCardPopoverId);
    if (!showCardPopover) {
      return;
    }
    showCardPopover.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}
function closeCard() {
  openedCardId.value = undefined;
}
</script>

<style scoped lang="css">
.cards-list {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  /* display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-columns: min-content;
  justify-items: center; */
  padding: 2em 0 0 1em;
  overflow: hidden;
  & > * {
    flex-basis: 25%;
  }
}

@media screen and (max-width: 768px) {
  .cards-list {
    & > * {
      flex-basis: 33%;
    }
  }
}

@media screen and (max-width: 600px) {
  .cards-list {
    & > * {
      flex-basis: 50%;
    }
  }
}

@media screen and (max-width: 320px) {
  .cards-list {
    & > * {
      flex-basis: 100%;
    }
  }
}

.show-card-full-view {
  grid-column: 1 / 4;
}
</style>
