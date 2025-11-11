<template>
  <div class="relative flex w-full flex-col pr-2 pb-5" ref="hostWrapperRef">
    <div class="card-wrapper relative h-full w-xs cursor-pointer justify-between" @click="openFullCard">
      <div class="h-full">
        <div class="title px-2.5 text-black">{{ title }}</div>
        <div class="picture-wrapper h-full">
          <picture class="w-full">
            <source
              :srcset="getResizedPosterUrl({ url: posterUrl, type: 'small' })"
              media="screen and (max-width: 660px)"
            />
            <source
              :srcset="getResizedPosterUrl({ url: posterUrl, type: 'normal' })"
              media="screen and (max-width: 1920px)"
            />
            <source
              :srcset="getResizedPosterUrl({ url: posterUrl, type: 'wide' })"
              media="screen and (min-width: 1920px)"
            />
            <img
              class="h-full w-full"
              :src="getResizedPosterUrl({ url: posterUrl, type: 'wide' })"
              alt=""
              width="100%"
              height="100%"
            />
          </picture>
        </div>

        <!-- <div class="px-2.5" v-if="genres.length">
        <div class="text-xs">Жанры:</div>
        <div class="flex flex-wrap">
          <GenreChip v-for="genre in genres" :key="genre" :id="genre" class="mr-1 mb-1"></GenreChip>
        </div>
      </div>
      <div class="px-2.5" v-if="labels.length">
        <div class="text-xs">Метки:</div>
        <div class="flex flex-wrap">
          <FilmLabel v-for="label in labels" :key="label" :id="label" class="mr-1 mb-1"></FilmLabel>
        </div>
      </div>
      <div class="px-2.5" v-if="kind">
        <div class="text-xs">Тип:</div>
        <div>
          <KindChip :id="kind" class="mr-1 mb-1"></KindChip>
        </div>
      </div>
      <nuxt-collapsible v-if="description" :open="descriptionShown">
        <template #content>
          <div class="description px-2.5">{{ description }}</div>
        </template>
      </nuxt-collapsible> -->
      </div>
    </div>
    <!-- TODO стоит попробовать делать один поповер на всю карусель.
     Тогда если использовать поповер, он не будет моргать из-за перепоявления.
     Нужно будет передавать референс для поповера при попытке открыть полный вид конкретной карточки.
     Вид карточки в поповере стоит сделать отдельным компонентом.
     Размер поповера стоит зафиксировать, или хотя бы указать его минимальную высоту близкую к конечной.
     Фиксация размера нужна для того, чтобы можно было нормально скроллить его в область просмотра,
     т.к. без этого гарантированно отобразить его в области видимости не получается,
     все варианты с nextTick, setTimeout не работают гарантированно. -->
    <FullWidthPopover
      :reference="hostWrapperRef"
      :dismissible="false"
      :model-value="fullViewOpen"
      :side="'bottom'"
      :side-flip="false"
      @update:model-value="changeFullCardShown"
    >
      <template #title>{{ title }}</template>
      <template #content>
        <div :id="popoverId">
          <div class="left"></div>
          <div class="background">
            <img :src="getResizedPictureUrl({ url: bannerUrl, type: 'wide' })" alt="" />
          </div>
        </div>
        <div class="description px-2.5">{{ description }}</div>
        <div class="px-2.5" v-if="genres.length">
          <div class="text-xs">Жанры:</div>
          <div class="flex flex-wrap">
            <GenreChip v-for="genre in genres" :key="genre" :id="genre" class="mr-1 mb-1"></GenreChip>
          </div>
        </div>
        <div class="px-2.5" v-if="labels.length">
          <div class="text-xs">Метки:</div>
          <div class="flex flex-wrap">
            <FilmLabel v-for="label in labels" :key="label" :id="label" class="mr-1 mb-1"></FilmLabel>
          </div>
        </div>
        <div class="px-2.5" v-if="kind">
          <div class="text-xs">Тип:</div>
          <div>
            <KindChip :id="kind" class="mr-1 mb-1"></KindChip>
          </div>
        </div>
      </template>
    </FullWidthPopover>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useTemplateRef } from 'vue';
import GenreChip from '../genre/GenreChip.vue';
import FilmLabel from '../label/FilmLabel.vue';
import type { TShowCard } from './types/show-card';
import KindChip from '../kinds/KindChip.vue';
import FullWidthPopover from '~/ui-kit/Popover/FullWidthPopover.vue';

const props = defineProps<{
  slide: TShowCard;
  fullViewOpen: boolean;
  popoverId: string;
}>();

const emits = defineEmits<{
  openFull: [];
  closeFull: [];
}>();

const hostWrapperRef = useTemplateRef('hostWrapperRef');

function getResizedPictureUrl({ url, type }: { url: string; type: 'small' | 'normal' | 'wide' }) {
  let width: number;
  let height: number;

  if (type === 'small') {
    width = 320;
    height = 180;
  } else if (type === 'normal') {
    width = 640;
    height = 360;
  } else {
    width = 960;
    height = 540;
  }

  return url.replace('{w}', width.toString()).replace('{h}', height.toString());
}

function getResizedPosterUrl({ url, type }: { url: string; type: 'small' | 'normal' | 'wide' }) {
  let width: number;
  let height: number;

  if (type === 'small') {
    width = 320;
    height = 480;
  } else if (type === 'normal') {
    width = 640;
    height = 960;
  } else {
    width = 960;
    height = 1440;
  }

  return url.replace('{w}', width.toString()).replace('{h}', height.toString());
}

const bannerUrl = computed(() => {
  const slideAssets = props.slide.assets;
  const url = slideAssets.find((asset) => asset.asset_type === 'Banner');
  if (!url) {
    return '';
  }
  return url.resize_url;
});

const posterUrl = computed(() => {
  const slideAssets = props.slide.assets;
  const url = slideAssets.find((asset) => asset.asset_type === 'Poster');
  if (!url) {
    return '';
  }
  return url.resize_url;
});

const title = computed(() => props.slide.title);

function openFullCard() {
  emits('openFull');
}

function closeFullCard() {
  emits('closeFull');
}

function changeFullCardShown(value: boolean) {
  if (value) {
    openFullCard();
  } else {
    console.log('close');
    closeFullCard();
  }
}

const description = computed(() => props.slide.description);
const descriptionShown = ref(false);
function toggleDescription() {
  descriptionShown.value = !descriptionShown.value;
}

const genres = computed(() => props.slide.genres);
const labels = computed(() => props.slide.labels);

const kind = computed(() => props.slide.kind);
</script>

<style scoped lang="css">
.title {
  position: absolute;
  width: 100%;
  transform: translateY(-100%);
  transition: transform 300ms ease-in-out;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
}

.description {
  width: 100%;
  max-height: 100%;
  overflow: hidden;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  transition: transform 200ms ease-in-out;
}
.card-wrapper:hover,
.card-wrapper:active,
.card-wrapper:focus {
  outline: none;
  transform: scale(1.025);
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.5);
  z-index: 1;
  .title {
    transform: translateY(0);
  }
}

.picture-wrapper {
  width: 100%;
}

:deep(.collapse-button) {
  .iconify {
    transition: transform 200ms ease-in-out;
  }
}

:deep(.expanded-button) {
  .iconify {
    transform: rotate(180deg);
  }
}
</style>
