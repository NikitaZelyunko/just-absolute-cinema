<template>
  <div v-if="chipTitle">
    <nuxt-badge class="rounded-full font-bold">{{ chipTitle }}</nuxt-badge>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useKindsStore } from './store/use-kinds';

const props = defineProps<{ id: string }>();

const kindsStore = useKindsStore();
const genresMap = await kindsStore.getAsyncKinds();
const chipTitle = computed(() => {
  const chip = genresMap.value.get(props.id);
  if (!chip) {
    return '';
  }

  return chip.name;
});
</script>
