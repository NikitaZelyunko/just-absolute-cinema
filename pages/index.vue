<script setup lang="ts">
import { useLocalStorage } from '~/app/composables/useLocalStorage';
import MainPage from '~/app/features/main-page/MainPage.vue';

const test = useLocalStorage('test-key', { a: 1 });
test.value.a += 1;
console.log('test: ', test.value);
function incrementA() {
  test.value.a++;
}
</script>

<template>
  {{ test }}
  <button @click="incrementA">Инкремент</button>
  <MainPage></MainPage>
</template>
