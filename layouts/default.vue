<script setup lang="ts">
import AppFooter from '~/app/components/AppFooter.vue';
import AppHeader from '~/app/components/AppHeader.vue';
</script>

<template>
  <div>
    <AppHeader />
    <div class="mt-12">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>
