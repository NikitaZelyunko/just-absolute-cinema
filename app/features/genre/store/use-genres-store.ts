import { defineStore } from 'pinia';
import type { TGenreResponse } from '../types/genre';
import { getGenresFromApi } from '../api/get-genres';
import { computed, ref } from 'vue';
import { useAsyncData } from '#app';

export const useGenresStore = defineStore('genres-store', () => {
  const genres = ref<TGenreResponse[]>([]);

  async function initGenres() {
    console.log('INIT_GENRES');
    try {
      const genresResponse = { value: await getGenresFromApi() };
      // const { data: genresResponse } = await useAsyncData(() =>
      //   getGenresFromApi(),
      // );
      console.log('GENRES RESPONSE', genresResponse.value);
      genres.value = genresResponse.value ?? [];
    } catch (error) {
      console.log('ERROR', error);
      genres.value = [];
    }

    return genres.value;
  }

  const genresMap = computed(() => {
    console.log('GENRES_MAP_CHANGE', genres.value);
    return genres.value.reduce((acc, item) => {
      acc.set(item.oid, item);
      return acc;
    }, new Map<string, TGenreResponse>());
  });

  async function getGenresMap() {
    if (!genres.value.length) {
      await initGenres();
    }

    return genresMap;
  }

  let genresInitPromise: ReturnType<typeof getGenresMap> | undefined;

  async function getAsyncGenresMap() {
    if (!genresInitPromise) {
      genresInitPromise = getGenresMap();
    }

    return genresInitPromise;
  }

  return {
    genres,
    genresMap,
    initGenres,
    getGenresMap,
    getAsyncGenresMap,
  };
});
