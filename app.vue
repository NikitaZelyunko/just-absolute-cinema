<script setup lang="ts">
import PopoverPortal from './ui-kit/Popover/PopoverPortal.vue';
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <PopoverPortal />
    </NuxtApp>
  </div>
</template>
