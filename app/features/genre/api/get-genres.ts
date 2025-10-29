import { useNuxtApp } from '#app';
import type { TGenreResponse } from '../types/genre';

export function getGenresFromApi() {
  const { $api } = useNuxtApp();

  return $api<TGenreResponse[]>('/metadata/genres/', { method: 'GET' });
}
