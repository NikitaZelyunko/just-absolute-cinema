<template>
  <div class="card-wrapper relative w-xs rounded-xl border-2 border-gray-200">
    <div class="title px-2.5 text-black">{{ title }}</div>
    <div class="flex h-48 w-xs flex-col items-center justify-start">
      <img :src="pictureUrl" class="self-center" />
    </div>

    <nuxt-collapsible v-if="description" :open="descriptionShown">
      <nuxt-button
        @click="toggleDescription"
        variant="link"
        trailing-icon="i-lucide-chevron-down"
        class="collapse-button cursor-pointer"
        :class="{ 'expanded-button': descriptionShown }"
        >Подробнее</nuxt-button
      >
      <template #content>
        <div class="description px-2.5">{{ description }}</div>
      </template>
    </nuxt-collapsible>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { TSlide } from '../main-page/types/main-page-showcase';

const props = defineProps<{
  slide: TSlide;
}>();

const pictureUrl = computed(() => {
  const slideAssets = props.slide.title.assets;
  const pictureUrl = slideAssets.find((asset) => asset.asset_type === 'Banner');
  if (!pictureUrl) {
    return '';
  }
  const width = 320;
  const height = 180;
  return pictureUrl.resize_url
    .replace('{w}', width.toString())
    .replace('{h}', height.toString());
});

const title = computed(() => props.slide.title.title ?? '');

const description = computed(() => props.slide.title.synopsis ?? '');
const descriptionShown = ref(false);
function toggleDescription() {
  descriptionShown.value = !descriptionShown.value;
}
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
  bottom: 0;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
}
.card-wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 20px;
}
.card-wrapper:hover,
.card-wrapper:active {
  .title {
    transform: translateY(0);
  }
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
