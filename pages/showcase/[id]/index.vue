<script setup lang="ts">
import { useRoute } from '#app';
import { computed } from 'vue';
import ShowCaseList from '~/app/features/collection/CollectionContentList.vue';

const route = useRoute();
const routeId = computed(() => {
  const idParam = route.params.id;
  if (Array.isArray(idParam)) {
    return idParam[0];
  }
  return idParam;
});
</script>

<template>
  <ShowCaseList :collection-id="routeId" :show-link="false"></ShowCaseList>
</template>
